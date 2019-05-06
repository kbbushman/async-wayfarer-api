const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// GET City Index Route
router.get('/', async (req, res) => {
  try {
    const data = await db.City.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});

// GET City Show Route
router.get('/:cityId', async (req, res) => {
  try {
    const data = await db.City.findById(req.params.cityId);
    res.json(data);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});

// GET City Posts Index Route
router.get('/:cityId/posts', async (req, res) => {
  try {
    const data = await db.Post.find({cityId: req.params.cityId})
      .populate('userId')
      .exec();
    res.json(data);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});


// POST City Posts Index Route
router.post('/:cityId/posts', async (req, res) => {
  if (!req.session.currentUser) {
    return res.status(401).json({status: 401, errors: 'Unauthorized. Please login and try again'});
  }

  try {
    const newPost = {
      userId: req.session.currentUser.id,
      cityId: req.params.cityId,
      title: req.body.title,
      body: req.body.body,
    }
    const data = await db.Post.create(newPost);
    result = await data.populate('userId').execPopulate();
    res.json(result);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});

module.exports = router;
