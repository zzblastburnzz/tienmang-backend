
const mongoose = require('mongoose');
const World = require('./models/world.model');
const Npc = require('./models/npc.model');

require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/tienmang';

async function assignRulers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Đã kết nối MongoDB');

    const npcs = await Npc.find({ isCore: true });
    const worlds = await World.find({});

    for (const world of worlds) {
      const worldRuler = npcs.find(npc => npc.archetype === 'Giới Chủ' && npc.gioi === world.name);
      if (worldRuler) {
        console.log(`🌍 ${world.name} ← ${worldRuler.name}`);
      }

      for (const region of world.regions) {
        const regionRuler = npcs.find(npc => npc.archetype === 'Trưởng châu' && npc.chau === region.name);
        if (regionRuler) {
          region.rulerId = regionRuler._id;
          console.log(`  🏯 ${region.name} ← ${regionRuler.name}`);
        }

        for (const city of region.cities) {
          const cityRuler = npcs.find(npc => npc.archetype === 'Thành Chủ' && npc.thanh === city.name);
          if (cityRuler) {
            city.rulerId = cityRuler._id;
            console.log(`    🏙️ ${city.name} ← ${cityRuler.name}`);
          }
        }
      }

      await world.save();
    }

    console.log('✅ Gán rulerId thành công!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Lỗi gán rulerId:', err.message);
    process.exit(1);
  }
}

assignRulers();
