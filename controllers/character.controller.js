// src/controllers/user.controller.js
const asyncHandler = require('express-async-handler');
const Character = require('../models/character.model');

// @desc    Get character profile
// @route   GET /api/character/profile
// @access  Private
const getCharacterProfile = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.character._id);
  if (character) {
    res.json(character);
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

// @desc    Update character profile + Check Dynamic Hidden Attributes
// @route   PUT /api/character/updateCharacterProfile
// @access  Private
const updateCharacterProfile = asyncHandler(async (req, res) => {
  const character = await Character.findById(req.character._id);

  if (character) {
    const { displayName, gender, location } = req.body;

    if (displayName) character.displayName = displayName;
    if (gender) character.gender = gender;
    if (location) character.location = location;
    if (avatar) character.avatar = avatar;
    if (cover) character.cover = cover;

    // Cập nhật các chỉ số xã hội nếu gửi lên
    if (friendshipScore !== undefined) character.friendshipScore = friendshipScore;
    if (charisma !== undefined) character.charisma = charisma;
    if (loveScore !== undefined) character.loveScore = loveScore;
    if (trustScore !== undefined) character.trustScore = trustScore;
    if (responsibility !== undefined) character.responsibility = responsibility;
    if (ambition !== undefined) character.ambition = ambition;
    if (leadershipSkill !== undefined) character.leadershipSkill = leadershipSkill;
    if (fame !== undefined) character.fame = fame;
    if (craftingSkill !== undefined) character.craftingSkill = craftingSkill;

    // Kiểm tra kích hoạt Dynamic Hidden Attributes
    if (character.friendshipScore > 50 && character.charisma > 60) character.dynamicHiddenAttributes.loveActivated = true;
    if (character.loveScore > 70 && character.trustScore > 50) character.dynamicHiddenAttributes.marriageStatus = 'Engaged';
    if (character.loveScore > 80 && character.dynamicHiddenAttributes.marriageStatus === 'Married') character.dynamicHiddenAttributes.hasChildren = true;
    if (character.responsibility > 60 && character.ambition > 70) character.dynamicHiddenAttributes.careerPath = 'Quan chức';
    if (character.leadershipSkill > 80 && character.fame > 100) character.dynamicHiddenAttributes.clanLeaderPotential = true;
    if (character.craftingSkill > 60 && character.responsibility > 50) character.dynamicHiddenAttributes.farmOwner = true;

    const updatedCharacter = await character.save();

    res.json(updatedCharacter);
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

module.exports = { getCharacterProfile, updateCharacterProfile };
