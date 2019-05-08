const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// GET User Show Route
router.get('/:userId', async (req, res) => {
  try {
    const user = await db.User.findById(req.params.userId, {password: 0, __v: 0});
    if (!user) return res.status(404).json({status: 404, error: 'User not found'});

    const userPosts = await db.Post.find({user_id: req.params.userId})
      .populate({ path: 'user_id', select: 'name' })
      .exec();

    res.json({user, userPosts});

  } catch(err) {
    console.log(err);
    return res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});


module.exports = router;
