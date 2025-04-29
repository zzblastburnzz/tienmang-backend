// src/controllers/user.controller.js
const asyncHandler = require('express-async-handler');
const User = require('../models/character.model');

// @desc    Get character profile
// @route   GET /api/character/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await Character.findById(req.character._id);
  if (character) {
    res.json(character);
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

// @desc    Update character profile + Check Dynamic Hidden Attributes
// @route   PUT /api/character/updateProfile
// @access  Private
const updateCharacterProfile = asyncHandler(async (req, res) => {
  const user = await Character.findById(req.character._id);

  if (character) {
    const { displayName, gender, location } = req.body;

    if (displayName) user.displayName = displayName;
    if (gender) user.gender = gender;
    if (location) user.location = location;
    if (avatar) user.avatar = avatar;
    if (cover) user.cover = cover;

    // Cập nhật các chỉ số xã hội nếu gửi lên
    if (friendshipScore !== undefined) user.friendshipScore = friendshipScore;
    if (charisma !== undefined) user.charisma = charisma;
    if (loveScore !== undefined) user.loveScore = loveScore;
    if (trustScore !== undefined) user.trustScore = trustScore;
    if (responsibility !== undefined) user.responsibility = responsibility;
    if (ambition !== undefined) user.ambition = ambition;
    if (leadershipSkill !== undefined) user.leadershipSkill = leadershipSkill;
    if (fame !== undefined) user.fame = fame;
    if (craftingSkill !== undefined) user.craftingSkill = craftingSkill;

    // Kiểm tra kích hoạt Dynamic Hidden Attributes
    if (user.friendshipScore > 50 && user.charisma > 60) user.dynamicHiddenAttributes.loveActivated = true;
    if (user.loveScore > 70 && user.trustScore > 50) user.dynamicHiddenAttributes.marriageStatus = 'Engaged';
    if (user.loveScore > 80 && user.dynamicHiddenAttributes.marriageStatus === 'Married') user.dynamicHiddenAttributes.hasChildren = true;
    if (user.responsibility > 60 && user.ambition > 70) user.dynamicHiddenAttributes.careerPath = 'Quan chức';
    if (user.leadershipSkill > 80 && user.fame > 100) user.dynamicHiddenAttributes.clanLeaderPotential = true;
    if (user.craftingSkill > 60 && user.responsibility > 50) user.dynamicHiddenAttributes.farmOwner = true;

    const updatedCharacter = await character.save();

    res.json(updatedCharacter);
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

module.exports = { getCharacterProfile, updateCharacterProfile };
