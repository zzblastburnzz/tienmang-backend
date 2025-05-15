
const express = require('express');
const router = express.Router();
const {
  getTodayStories,
  reactToStory,
  getReactedStories
} = require('../controllers/story.controller');

router.get('/today', getTodayStories);
router.post('/:id/react', reactToStory);
router.get('/reacted/:userId', getReactedStories);

module.exports = router;
