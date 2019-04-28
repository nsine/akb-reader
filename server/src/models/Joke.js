const mongoose = require('mongoose');
const { Schema } = mongoose;

const JokeSchema = new Schema({
  vkPostId: String,
  likes: [String],
  dislikes: [String],
  comments: [{
    userId: Schema.Types.ObjectId,
    text: String,
  }],
});

module.exports = mongoose.model('jokes', JokeSchema);
