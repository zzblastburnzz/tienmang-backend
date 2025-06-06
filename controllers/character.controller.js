const asyncHandler = require('express-async-handler');
const Character = require('../models/character.model');

// @desc    Get character profile
// @route   GET /character/profile
// @access  Private
const getCharacterProfile = asyncHandler(async (req, res) => {
  const character = await Character.findOne({ userId: req.user._id });
  if (character) {
    const profileComplete = !!(character.displayName && character.gender);
    res.json({ ...character.toObject(), profileComplete });
  } else {
    res.status(404);
    throw new Error('Character not found');
  }
});

// @desc    Update or create character profile
// @route   PUT /character/updateProfile
// @access  Private
const updateCharacterProfile = asyncHandler(async (req, res) => {
  let character = await Character.findOne({ userId: req.user._id });
  const {
    displayName,
    gender,
    location,
    avatar,
    cover,
    friendshipScore,
    charisma,
    loveScore,
    trustScore,
    responsibility,
    ambition,
    leadershipSkill,
    fame,
    craftingSkill
  } = req.body;

  if (!character) {
    if (!displayName || !gender || !location) {
      res.status(400);
      throw new Error('Thiếu thông tin để tạo nhân vật');
    }
    character = await Character.create({
      userId: req.user._id,
      displayName,
      gender,
      location,
      avatar,
      cover,
      dynamicHiddenAttributes: {}
    });
    return res.status(201).json(character);
  }

  if (displayName) character.displayName = displayName;
  if (gender) character.gender = gender;
  if (location) character.location = location;
  if (avatar) character.avatar = avatar;
  if (cover) character.cover = cover;

  if (friendshipScore !== undefined) character.friendshipScore = friendshipScore;
  if (charisma !== undefined) character.charisma = charisma;
  if (loveScore !== undefined) character.loveScore = loveScore;
  if (trustScore !== undefined) character.trustScore = trustScore;
  if (responsibility !== undefined) character.responsibility = responsibility;
  if (ambition !== undefined) character.ambition = ambition;
  if (leadershipSkill !== undefined) character.leadershipSkill = leadershipSkill;
  if (fame !== undefined) character.fame = fame;
  if (craftingSkill !== undefined) character.craftingSkill = craftingSkill;

  if (character.friendshipScore > 50 && character.charisma > 60) {
    character.dynamicHiddenAttributes.loveActivated = true;
  }
  if (character.loveScore > 70 && character.trustScore > 50) {
    character.dynamicHiddenAttributes.marriageStatus = 'Engaged';
  }
  if (character.loveScore > 80 && character.dynamicHiddenAttributes.marriageStatus === 'Married') {
    character.dynamicHiddenAttributes.hasChildren = true;
  }
  if (character.responsibility > 60 && character.ambition > 70) {
    character.dynamicHiddenAttributes.careerPath = 'Quan chức';
  }
  if (character.leadershipSkill > 80 && character.fame > 100) {
    character.dynamicHiddenAttributes.clanLeaderPotential = true;
  }
  if (character.craftingSkill > 60 && character.responsibility > 50) {
    character.dynamicHiddenAttributes.farmOwner = true;
  }

  const updatedCharacter = await character.save();
  res.json(updatedCharacter);
});

module.exports = { getCharacterProfile, updateCharacterProfile };
