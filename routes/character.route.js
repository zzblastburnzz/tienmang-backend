
const express = require('express');
const router = express.Router();
const {
  getCharacterProfile,
  updateCharacterProfile,
  renderCharacterImage
} = require('../controllers/character.controller');
const { protect } = require('../../middleware/authMiddleware');

router.get('/profile', protect, getCharacterProfile);
router.patch('/profile', protect, updateCharacterProfile);
router.post('/render-image', protect, renderCharacterImage);

module.exports = router;
