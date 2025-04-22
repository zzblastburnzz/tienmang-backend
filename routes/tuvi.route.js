
const express = require('express');
const router = express.Router();
const { breakthrough } = require('../controllers/tuvi.controller');

router.post('/breakthrough', breakthrough);

module.exports = router;
