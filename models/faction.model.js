
const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  level: { type: String, enum: ['đại phái', 'trung phái', 'tiểu phái'], default: 'tiểu phái' },
  origin: {
    world: String,  // giới
    region: String, // châu
    city: String    // thành
  },
  description: String,
  emblem: String, // biểu tượng môn phái (ảnh URL)
  doctrine: String // giáo lý
}, { timestamps: true });

module.exports = mongoose.model('Faction', factionSchema);
