// models/friendRequest.model.js
const mongoose = require('mongoose');

const FriendRequestSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'Npc', required: true },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'Npc', required: true },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('FriendRequest', FriendRequestSchema);
