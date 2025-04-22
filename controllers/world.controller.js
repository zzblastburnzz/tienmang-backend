
const World = require('../models/world.model');

exports.getWorlds = async (req, res) => {
  try {
    const worlds = await World.find({});
    res.json(worlds);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách giới', error: err.message });
  }
};
