
const asyncHandler = require('express-async-handler');
const Character = require('../models/character.model');

// GET /character/profile
const getCharacterProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const character = await Character.findOne({ userId });
  if (!character) {
    res.status(404);
    throw new Error('Character not found');
  }
  res.json(character);
});

// PATCH /character/profile
const updateCharacterProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const updates = req.body;
  const character = await Character.findOneAndUpdate({ userId }, updates, { new: true });
  if (!character) {
    res.status(404);
    throw new Error('Character not found');
  }
  res.json(character);
});

// POST /character/render-image
const renderCharacterImage = asyncHandler(async (req, res) => {
  const { prompt, imageBase64, type } = req.body;
  if (!prompt || !imageBase64 || !type) {
    res.status(400);
    throw new Error('Thiếu dữ liệu cần thiết.');
  }

  const userId = req.user._id;

  // Tạm thời mock AI ảnh trả về
  const generatedUrl = `https://cdn.vonggioi.com/generated/${Date.now()}.jpg`;

  const update = type === 'cover'
    ? { cover: generatedUrl }
    : { avatarFull: generatedUrl };

  const updatedCharacter = await Character.findOneAndUpdate(
    { userId },
    { $set: update },
    { new: true }
  );

  if (!updatedCharacter) {
    res.status(404);
    throw new Error('Không tìm thấy nhân vật.');
  }

  res.json({ success: true, imageUrl: generatedUrl });
});

module.exports = {
  getCharacterProfile,
  updateCharacterProfile,
  renderCharacterImage
};
