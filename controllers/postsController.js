const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// GET Post Index Route
router.get('/', async (req, res) => {
  try {
    const data = await db.Post.find()
      .populate('userId', '-password -email -sign_up_date')
      .populate('cityId')
      .exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});


// GET Post Show Route
router.get('/:postId', async (req, res) => {
  try {
    const data = await db.Post.findById(req.params.postId)
      .populate('userId')
      .populate('cityId')
      .exec();
    res.json({status: 200, data});
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});


// DELETE Post Destroy Route
router.delete('/:postId', async (req, res) => {
  // console.log(req.session.currentUser)
  if (!req.session.currentUser) {
    return res.status(401).json({status: 401, errors: 'Unauthorized. Please login and try again'});
  }

  try {
    const post = await db.Post.findById(req.params.postId);
    console.log(post.userId.toString(), req.session.currentUser)
    if (post.user_id.toString() !== req.session.currentUser) {
      return res.status(401).json({status: 401, errors: 'You do not have permission to delete this post'});
    }
    
    const deletedPost = await post.deleteOne();
    console.log(deletedPost)
    res.json({status: 200});
  } catch (err) {
      res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});

module.exports = router;
