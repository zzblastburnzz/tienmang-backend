// routes/sociallink.route.js
const express = require('express');
const router = express.Router();
const SocialLink = require('../models/sociallink.model');

// Cập nhật quan hệ + thêm ký ức
router.post('/update', async (req, res) => {
  try {
    const { from, to, type, delta, memory } = req.body;

    let link = await SocialLink.findOne({ from, to, type });
    if (!link) {
      link = new SocialLink({ from, to, type, relation: 'quen', score: 50, memory: [] });
    }

    link.score = Math.min(100, Math.max(0, link.score + delta));
    if (memory) link.memory.push(memory);
    link.updatedAt = new Date();

    await link.save();
    res.status(200).json(link);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lấy danh sách quan hệ của 1 user hoặc NPC
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const links = await SocialLink.find({ from: id }).populate('to');
    res.status(200).json(links);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
