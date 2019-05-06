const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  image_url: String,
  sign_up_date: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
