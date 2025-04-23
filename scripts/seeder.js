
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');
const World = require('../models/world.model');

dotenv.config();

async function seedWorlds() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    const filePath = path.join(__dirname, '../seed_worlds_custom.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await World.deleteMany({});
    await World.insertMany(data);

    console.log('✅ Đã import dữ liệu thế giới thành công!');
    process.exit();
  } catch (err) {
    console.error('❌ Lỗi khi import dữ liệu:', err.message);
    process.exit(1);
  }
}

seedWorlds();
