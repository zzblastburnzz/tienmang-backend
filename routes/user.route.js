// src/routes/user.route.js
const express = require('express');
const { getUserProfile, updateUserProfile } = require('../controllers/user.controller');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile);
router.route('/updateProfile').put(protect, updateUserProfile);

module.exports = router;
