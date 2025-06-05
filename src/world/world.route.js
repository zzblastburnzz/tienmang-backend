const express = require('express');
const router = express.Router();
const worldController = require('./world.controller');
const entityTick = require('../entity/entity-tick.service');

router.post('/init', worldController.initializeWorld);

router.post('/tick', async (req, res) => {
  try {
    const worldState = await worldController.tickWorld();
    await entityTick.tickEntities();
    res.json(worldState);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/state', worldController.getWorldState);

router.get('/element-decay/:element', worldController.getElementDecayInfo);
router.get('/decay-rates', worldController.getAllDecayRates);

module.exports = router;