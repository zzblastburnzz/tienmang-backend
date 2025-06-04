const mongoose = require('mongoose');

const WorldStateSchema = new mongoose.Schema({
  age: { type: Number, default: 0 },
  totalElements: { type: Object, required: true },
  availableElements: { type: Object, required: true },
  totalLinhKhi: { type: Number, required: true },
  availableLinhKhi: { type: Number, required: true },
  stability: { type: Number, default: 100 },
});

module.exports = mongoose.model('WorldState', WorldStateSchema);
