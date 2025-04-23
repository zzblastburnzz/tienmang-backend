
const mongoose = require('mongoose');

const memoryLogSchema = new mongoose.Schema({
  event: String,
  target: { type: mongoose.Schema.Types.ObjectId, ref: 'Npc' },
  date: Date,
  mood: String
});

const npcSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, unique: true, trim: true },
  avatar: String,
  gioi: String,
  chau: String,
  thanh: String,
  monPhai: String,
  tuVi: String,
  linhCan: String,
  ngoTinh: Number,
  soThich: [String],
  tinhCach: String,
  originWorld: String,
  archetype: String,
  currentRole: String,
  isCore: Boolean,
  roleScore: Number,
  knownPeople: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Npc' }],
  memoryLog: [memoryLogSchema]
});

module.exports = mongoose.model('Npc', npcSchema);
