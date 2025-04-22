
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  description: String
}, { _id: false });

const regionSchema = new mongoose.Schema({
  name: String,
  cities: [citySchema]
}, { _id: false });

const worldSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  regions: [regionSchema],
  type: { type: String, enum: ['giới'], default: 'giới' }
}, { timestamps: true });

module.exports = mongoose.model('World', worldSchema);
