
const express = require('express');
const router = express.Router();
const {
  createPost,
  getFeed,
  reactToPost,
  commentOnPost
} = require('../controllers/post.controller');

router.post('/', createPost);
router.get('/', getFeed);
router.post('/:id/react', reactToPost);
router.post('/:id/comment', commentOnPost);

module.exports = router;
