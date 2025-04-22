
const mongoose = require('mongoose');

const socialLinkSchema = new mongoose.Schema({
  userA: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userB: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, default: 0 }, // -100 đến 100
  type: {
    type: String,
    enum: ['enemy', 'neutral', 'acquaintance', 'friend', 'close', 'soulmate'],
    default: 'neutral'
  },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

socialLinkSchema.index({ userA: 1, userB: 1 }, { unique: true });

module.exports = mongoose.model('SocialLink', socialLinkSchema);
