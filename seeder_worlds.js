
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const World = require('./models/world.model');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tienmang';

async function seedWorlds() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    const data = fs.readFileSync(path.join(__dirname, 'worlds_seed.json'), 'utf-8');
    const worlds = JSON.parse(data);

    await World.deleteMany({});
    await World.insertMany(worlds);

    console.log('✅ Đã import dữ liệu thế giới thành công!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi khi import dữ liệu:', err.message);
    process.exit(1);
  }
}

seedWorlds();
