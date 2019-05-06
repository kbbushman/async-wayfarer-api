const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  cityId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
  title: String,
  body: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
