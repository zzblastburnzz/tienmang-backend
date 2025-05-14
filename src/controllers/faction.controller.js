
const Faction = require('../models/faction.model');

exports.getFactions = async (req, res) => {
  try {
    const factions = await Faction.find({});
    res.json(factions);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách môn phái', error: err.message });
  }
};
