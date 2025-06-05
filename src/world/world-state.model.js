const mongoose = require('mongoose');

const WorldStateSchema = new mongoose.Schema({
  age: { type: Number, default: 0 },
  totalElements: { type: Object, required: true },
  availableElements: { type: Object, required: true },
  totalLinhKhi: { type: Number, required: true },
  availableLinhKhi: { type: Number, required: true },
  stability: { type: Number, default: 100 },
  stabilityStatus: { type: String, default: 'stable', enum: ['critical', 'unstable', 'stable'] },
  elementHistory: { type: Object },
  regenHistory: { type: Object },
  elementHalfLives: { type: Object },
  totalEntities: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorldState', WorldStateSchema);