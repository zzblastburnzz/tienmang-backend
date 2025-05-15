
const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: String,
  description: String,
  cityType: { type: String, enum: ['thành', 'làng', 'hang ổ'], default: 'thành' },
  rulerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Npc' }
});

const regionSchema = new mongoose.Schema({
  name: String,
  cities: [citySchema],
  rulerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Npc' }
});

const worldSchema = new mongoose.Schema({
  name: String,
  type: { type: String, enum: ['Nhân', 'Ma', 'Thần', 'Linh', 'Yêu', 'Hỗn Độn'], default: 'Nhân' },
  description: String,
  populationScale: String,
  averageTuVi: String,
  regions: [regionSchema]
});

module.exports = mongoose.model('World', worldSchema);
