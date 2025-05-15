
const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  npc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  image: String,
  caption: String,
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
      emoji: String,
      reactedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Story', storySchema);
