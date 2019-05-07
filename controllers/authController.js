const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// Database
const db = require('../models');


// POST Register Route
router.post('/register', async (req, res) => {
  const errors = [];

  // Validate Form Data
  if (!req.body.name) {
    errors.push({message: 'Please enter your name'});
  }

  if (!req.body.email) {
    errors.push({message: 'Please enter your email'});
  }

  if (!req.body.password) {
    errors.push({message: 'Please enter your password'});
  }

  if (req.body.password !== req.body.password2) {
    errors.push({message: 'Your passwords do not match'});
  }

  // If there are any validation errors, send error status and messages
  if (errors.length) {
    return res.status(400).json({status: 400, errors});
  }

  try {
    // Generate salt for additional password hash complexity
    const hashedPassword = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    // Check for registered email
    const userExists = await db.User.findOne({email: req.body.email});
    // Return error if user email already registered
    if (userExists) return res.status(401).json({status: 401, errors: [{message: 'That email address has already been registered'}]});

    // Create new user
    const newUser = {};
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = hashedPassword;

    const savdedUser = await User.create(newUser);
    res.status(200).json({status: 200, message: 'User account creatd succesfully'});
  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({ status: 500, error: err});
  }


  // // Generate salt for additional password hash complexity
  // bcrypt.genSalt(10, (err, salt) => {
  //   if (err) return res.status(400).json({status: 400, errors: 'Something went wrong. Please try again'});

  //   // Hash user password from signup form
  //   bcrypt.hash(req.body.password, salt, (err, hash) => {
  //     if (err) return res.status(400).json({status: 400, errors: 'Something went wrong. Please try again'});

  //     // Create an object to hold the new user information (with hashed password, not original password)
  //     const newUser = {
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: hash,
  //       city: req.body.city
  //     }

  //     // Create a new User record in MongoDB from the newUser object above
  //     db.User.create(newUser, (err, newUser) => {
  //       if (err) return res.status(400).json({ errors: err});
  //       // If new user was created successfully, send success status and message
  //       // We could also create the session here (just like the login route), then send success status and message
  //       res.status(200).json(newUser);
  //     });
  //   });
  // });


});



// POST Login Route
router.post('/login', async (req, res) => {
  // First make sure the user didn't submit an empty form
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({errors: 'Please enter your email and password'});
  }


  try {
    const foundUser = await db.User.findOne({email: req.body.email});
    // Return error if user not found
    if (!foundUser) return res.status(400).json({errors: 'Username or password is incorrect'});

    // Compare passwords if user found
    const passwordsMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (passwordsMatch) {
      // Create user session
      req.session.currentUser = foundUser._id;
      // Then send success status and message
      return res.json({status: 200, message: 'Login successful', userId: foundUser._id});
    }

  } catch (err) {
    console.log(err);
    if (err) return res.status(500).json({status: 500, errors: 'Something went wrong. Please try again'});
  }



  // // Find one User by email
  // db.User.findOne({email: req.body.email}, (err, foundUser) => {
  //   if (err) return res.status(500).json({status: 500, errors: 'Something went wrong. Please try again'});

  //   // If we didn't find a user, send error message
  //   if (!foundUser) {
  //     return res.status(400).json({errors: 'Username or password is incorrect'});
  //   }

  //   // If this line of code runs, it means we found the user
  //   // Compare the password submitted by user login form with password from found user
  //   bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
  //     if (err) return res.status(400).json({errors: 'Username or password is incorrect'});

  //     // If the passwords match, create a new session with currentUser properties (or any properties you want except the user password)
  //     if (isMatch) {
  //       req.session.currentUser = id: foundUser._id;

  //       // Then send success status and message
  //       return res.json({status: 200, message: 'Login successful', userId: foundUser._id});

  //     } else {
  //       // If the passwords do not match, send error message
  //       return res.status(400).json({errors: 'Username or password is incorrect'});
  //     }
  //   });
  // });


});


// POST Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({status: 500, errors: 'Something went wrong. Please try again'});
    res.clearCookie('wsid').json({status: 200, message: 'Logout successful'});
  });
});


// GET Users Route
router.get('/users', (req, res) => {
  // if (!req.session.currentUser) {
  //   return res.status(401).json({status: 401, errors: 'Unauthorized. Please login and try again'});
  // }

  db.User.find({}, {password: 0, email: 0, __v: 0}, (err, allUsers) => {
    if (err) return res.status(500).json({status: 500, errors: 'Something went wrong. Please try again'});
    res.json(allUsers);
  });
});



module.exports = router;
