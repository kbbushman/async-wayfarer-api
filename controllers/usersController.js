const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// GET User Show Route
router.get('/:userId', async (req, res) => {
  // if (req.session.currentUser && req.session.currentUser.email !== req.params.email) {
  //   return res.status(401).json({status: 401, error: 'Unauthorized.'});
  // }

  try {
    const user = await db.User.findById(req.params.userId);
    const posts = await db.Post.find({userId: req.params.userId})
      .populate('userId')
      .exec();
    res.json({user, posts});
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});


// GET User Posts Index Route
router.get('/:userId/posts', async (req, res) => {
  try {
    const data = await db.Post.find({userId: req.params.userId})
      .populate('userId')
      .exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
})


module.exports = router;
