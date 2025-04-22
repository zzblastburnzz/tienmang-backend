
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  avatar: { type: String, default: '' },
  cover: { type: String, default: '' },
  mood: { type: String, enum: ['happy', 'sad', 'neutral'], default: 'neutral' }

  realTuVi: { type: String, default: 'Phàm nhân' },
  showTuVi: { type: String, default: 'Ẩn' },
  linhCan: { type: String, default: 'Vô linh' },
  ngoTinh: { type: Number, default: 20 },
  soThich: [String],
  gioi: String,
  chau: String,
  thanh: String,
  monPhai: String,
  anTuVi: { type: Boolean, default: false },
  soGioBeQuan: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
