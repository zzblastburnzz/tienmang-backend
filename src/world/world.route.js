const express = require('express');
const router = express.Router();
const worldController = require('./world.controller');
const entityTick = require('../entity/entity-tick.service'); // 👈 Thêm phần này

router.post('/init', worldController.initWorld);

// Tick thế giới + entity cùng lúc
router.post('/tick', async (req, res) => {
  await worldController.tickWorld(req, res);
  await entityTick.tickEntities();
});

router.get('/state', worldController.getWorldState);

module.exports = router;
