const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CitySchema = new Schema({
  name: String,
  description: String,
  country: String,
  image_url: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

const City = mongoose.model('City', CitySchema);
module.exports = City;
