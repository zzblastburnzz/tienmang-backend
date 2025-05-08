
const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const Character = require('../models/character.model');
const { callAiRenderImage } = require('../services/ai.service');

router.post('/render-image', authenticate, async (req, res) => {
  const { imageBase64, prompt, type = 'cover' } = req.body;
  const userId = req.user.id;

  try {
    const imageUrl = await callAiRenderImage(imageBase64, prompt);
    if (!imageUrl) return res.status(500).json({ message: 'Không tạo được ảnh' });

    const character = await Character.findOne({ userId });
    if (!character) return res.status(404).json({ message: 'Không tìm thấy nhân vật' });

    if (type === 'cover') character.avatar_full = imageUrl;

    character.images.push({
      url: imageUrl,
      createdAt: new Date()
    });

    await character.save();
    return res.json({ imageUrl });
  } catch (err) {
    console.error('🔥 Lỗi AI render:', err);
    res.status(500).json({ message: 'Lỗi server khi gọi AI' });
  }
});

module.exports = router;
    