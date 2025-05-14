// src/routes/user.route.js
const express = require('express');
const { getCharacterProfile, updateCharacterProfile } = require('../controllers/character.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getCharacterProfile);
router.route('/updateProfile').put(protect, updateCharacterProfile);

module.exports = router;
