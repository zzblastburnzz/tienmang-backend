const express = require('express');
const router = express.Router();
const worldController = require('../controllers/world.controller');

router.post('/init', worldController.initWorld);
router.post('/tick', worldController.tickWorld);
router.get('/state', worldController.getWorldState);

module.exports = router;
