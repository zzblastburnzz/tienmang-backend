
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  image: String,
  mood: {
    type: String,
    enum: ['happy', 'sad', 'neutral'],
    default: 'neutral'
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  reactions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      type: { type: String, enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'] }
    }
  ],
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      text: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
