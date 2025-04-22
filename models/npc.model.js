
const mongoose = require('mongoose');

const npcSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  avatar: String,
  cover: String,
  mood: { type: String, enum: ['happy', 'sad', 'neutral'], default: 'neutral' },
  personality: { type: String, default: 'friendly' },
  worldOrigin: { type: String, required: true },
  bio: { type: String, default: '' },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

  realTuVi: { type: String, default: 'Luyện Khí' },
  showTuVi: { type: String, default: 'Luyện Khí' },
  linhCan: { type: String, default: 'Hỏa' },
  ngoTinh: { type: Number, default: 35 },
  soThich: [String],
  gioi: String,
  chau: String,
  thanh: String,
  monPhai: String,
  anTuVi: { type: Boolean, default: false },
  soGioBeQuan: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('NPC', npcSchema);
