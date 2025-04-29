
const express = require('express');
const router = express.Router();
const World = require('../models/world.model');
const Character = require('../models/character.model');

router.get('/', async (req, res) => {
  try {
    const worlds = await World.find({}).lean();

    // Populate ruler thông qua npc model
    for (const world of worlds) {
      for (const region of world.regions) {
        if (region.rulerId) {
          const ruler = await Npc.findById(region.rulerId).select('name avatar currentRole');
          region.ruler = ruler;
        }

        for (const city of region.cities) {
          if (city.rulerId) {
            const ruler = await Npc.findById(city.rulerId).select('name avatar currentRole');
            city.ruler = ruler;
          }
        }
      }
    }

    res.json(worlds);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy dữ liệu thế giới', error: err.message });
  }
});

module.exports = router;
