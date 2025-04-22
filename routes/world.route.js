
const express = require('express');
const router = express.Router();
const { getWorlds } = require('../controllers/world.controller');

router.get('/', getWorlds);

module.exports = router;
