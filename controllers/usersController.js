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
    const user = await db.User.findById(req.params.userId, {password: 0, email: 0, __v: 0});
    const posts = await db.Post.find({userId: req.params.userId})
      // .populate('userId')
      .populate({path: 'userId', select: 'name'})
      .exec();
    if (!user) {
      res.status(404).json({status: 404, error: 'User not found'});
    }
    
    return res.json({user, posts});
    
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});


// GET User Posts Index Route
// router.get('/:userId/posts', async (req, res) => {
//   try {
//     const data = await db.Post.find({userId: req.params.userId})
//       .populate('userId')
//       .exec();
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
//   }
// })


module.exports = router;
