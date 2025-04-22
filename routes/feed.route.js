
const express = require('express');
const router = express.Router();
const { getPersonalizedFeed } = require('../controllers/personalizedFeed.controller');

router.get('/:userId/personalized', getPersonalizedFeed);

module.exports = router;
