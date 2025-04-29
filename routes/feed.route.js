// routes/feed.route.js (gộp feed toàn cục + cá nhân hóa)
const express = require('express');
const router = express.Router();
const Npc = require('../models/character.model');
const Post = require('../models/post.model');
const SocialLink = require('../models/sociallink.model');

// GET /feed?characterId=... => cá nhân hóa | không có characterId => toàn cục
router.get('/', async (req, res) => {
  const { userId } = req.query;

  try {
    const posts = await Post.find({}).sort({ createdAt: -1 }).limit(50).populate('author');

    if (!userId) {
      return res.json(posts); // không có user → feed chung
    }

    const user = await Npc.findById(userId);
    const socialLinks = await SocialLink.find({ from: userId });

    const personalized = posts.map(post => {
      const link = socialLinks.find(link => String(link.to) === String(post.author._id));
      let rank = link?.score ?? 50;

      if (user.location?.gioi === post.author.location?.gioi) rank += 10;
      if (post.author.socialReputation > 70) rank += 10;
      if (post.tags?.includes('drama') && user.behavior?.attitude === 'lắm lời') rank += 5;

      return { post, rank };
    }).sort((a, b) => b.rank - a.rank);

    res.json(personalized.map(p => p.post));
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy feed', error: err.message });
  }
});

module.exports = router;
