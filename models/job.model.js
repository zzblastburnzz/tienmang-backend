// models/job.model.js
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  reward: {
    coins: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    exp: { type: Number, default: 0 },
    item: { type: String },
    favor: { type: Number, default: 0 }
  },
  type: { type: String, enum: ['chat', 'board'], default: 'board' },
  location: {
    gioi: String,
    chau: String,
    thanh: String
  },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

module.exports = mongoose.model('Job', JobSchema);
