
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const Faction = require('../models/faction.model');

dotenv.config();

async function seedFactions() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    const filePath = path.join(__dirname, '../seed_factions.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await Faction.deleteMany({});
    await Faction.insertMany(data);

    console.log('✅ Đã import dữ liệu môn phái thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Lỗi khi import dữ liệu môn phái:', err.message);
    process.exit(1);
  }
}

seedFactions();
