const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post'
  },
  body: String,
  date_created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;
