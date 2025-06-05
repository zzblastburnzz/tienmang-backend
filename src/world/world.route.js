const express = require('express');
const router = express.Router();
const worldController = require('./world.controller');
const entityTick = require('../entity/entity-tick.service');

router.post('/init', worldController.initializeWorld);
router.post('/tick', worldController.tickWorld);
router.get('/state', worldController.getWorldState);
router.get('/element-decay/:element', worldController.getElementDecayInfo);
router.get('/decay-rates', worldController.getAllDecayRates);

module.exports = router;