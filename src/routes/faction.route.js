
const express = require('express');
const router = express.Router();
const { getFactions } = require('../controllers/faction.controller');

router.get('/', getFactions);

module.exports = router;
