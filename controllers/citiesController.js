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
      .populate('userId', '-password -city -email -__v')
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
      userId: req.session.currentUser,
      cityId: req.params.cityId,
      title: req.body.title,
      body: req.body.body,
    }
    const data = await db.Post.create(newPost);
    // ExecPopulate since populate doesn't return a query
    // result = await data.populate('userId', '-password').execPopulate();
    result = await data.populate({path: 'userId', select: 'name'}).execPopulate();
    res.json(result);
  } catch (err) {
    res.status(500).json({status: 500, error: 'Something went wrong. Please try again'});
  }
});

module.exports = router;
