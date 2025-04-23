
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Npc = require('./models/npc.model');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tienmang';

async function seedArchetypeNpcs() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    const data = fs.readFileSync(path.join(__dirname, 'archetype_npcs.json'), 'utf-8');
    const npcs = JSON.parse(data);

    await Npc.deleteMany({ isCore: true }); // chỉ xóa NPC chủ lực nếu có
    await Npc.insertMany(npcs);

    console.log('✅ Đã import 50 NPC archetype thành công!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi khi import NPC:', err.message);
    process.exit(1);
  }
}

seedArchetypeNpcs();
