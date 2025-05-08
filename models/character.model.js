// src/models/user.model.js
const mongoose = require('mongoose');

const characterSchema = new mongoose.Schema({
  // Core Attributes
  userId: { type: String, unique: true },
  displayName: { type: String, default: '' },
  birthYear: { type: Number, default: 2000 },
  gender: { type: String, enum: ['Nam', 'Nữ', 'Khác'], default: 'Khác' },
  location: { type: String, default: 'Nhân Giới - Địa Cầu' },
  vitality: { type: Number, default: 100 },
  intelligence: { type: Number, default: 50 },
  wisdom: { type: Number, default: 50 },
  charisma: { type: Number, default: 50 },
  luck: { type: Number, default: 50 },

  // Tu Vi Attributes
  realTuVi: { type: String, default: 'Phàm nhân' },
  showTuVi: { type: String, default: 'Ẩn' },
  linhCan: { type: String, default: 'Vô linh' },
  ngoTinh: { type: Number, default: 20 },
  tinhThan: { type: Number, default: 20 },
  kinhMach: { type: Number, default: 100 },

  // Xã Hội Attributes
  reputation: { type: Number, default: 50 },
  fame: { type: Number, default: 0 },
  trustScore: { type: Number, default: 50 },
  betrayalScore: { type: Number, default: 0 },
  friendshipScore: { type: Number, default: 0 },
  loveScore: { type: Number, default: 0 },
  enemyScore: { type: Number, default: 0 },

  // Kỹ Năng Attributes
  fightingSkill: { type: Number, default: 10 },
  craftingSkill: { type: Number, default: 10 },
  alchemySkill: { type: Number, default: 10 },
  socialSkill: { type: Number, default: 10 },
  leadershipSkill: { type: Number, default: 10 },

  // Tương Tác Attributes
  responsibility: { type: Number, default: 50 },
  kindness: { type: Number, default: 50 },
  ambition: { type: Number, default: 50 },
  honor: { type: Number, default: 50 },
  selfDiscipline: { type: Number, default: 50 },

  // Trạng Thái Động Attributes
  mood: { type: String, enum: ['happy', 'sad', 'angry', 'neutral'], default: 'neutral' },
  randomState: { type: String, default: '' },
  luckyDay: { type: Boolean, default: false },
  cursedDay: { type: Boolean, default: false },

  // Hidden Attributes
  hiddenAttributes: {
    destinyPower: { type: Boolean, default: false },
    darkAffinity: { type: Boolean, default: false },
    divineFavor: { type: Boolean, default: false },
    cursedSeed: { type: Boolean, default: false },
    chaosHeart: { type: Boolean, default: false },
    eternalWill: { type: Boolean, default: false },
  },

  // Dynamic Hidden Attributes
  dynamicHiddenAttributes: {
    loveActivated: { type: Boolean, default: false },
    marriageStatus: { type: String, enum: ['Single', 'Engaged', 'Married'], default: 'Single' },
    hasChildren: { type: Boolean, default: false },
    careerPath: { type: String, default: '' },
    clanLeaderPotential: { type: Boolean, default: false },
    farmOwner: { type: Boolean, default: false },
  },

  avatar_full: { type: String, default: '' },
  images: [
    {
      url: String,
      createdAt: { type: Date, default: Date.now }
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model('Character', characterSchema);
