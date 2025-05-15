
const Character = require('../models/character.model');

exports.getAllNPCs = async (req, res) => {
  try {
    const characters = await Character.find().select('-__v').limit(20);
    res.json(npcs);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.getCharacterById = async (req, res) => {
  try {
    const npc = await Character.findById(req.params.id).populate('friends', 'username avatar');
    if (!npc) return res.status(404).json({ message: 'Nhân vật không tồn tại' });
    res.json(npc);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  const userId = req.body.userId;
  try {
    const npc = await Character.findById(req.params.id);
    if (!npc) return res.status(404).json({ message: 'NPC không tồn tại' });

    if (!npc.friends.includes(userId)) {
      npc.friends.push(userId);
      await npc.save();
    }

    res.json({ message: 'Đã gửi kết bạn với nhân vật', character });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
