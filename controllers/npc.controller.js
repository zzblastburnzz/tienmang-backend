
const NPC = require('../models/npc.model');
const User = require('../models/user.model');

exports.getAllNPCs = async (req, res) => {
  try {
    const npcs = await NPC.find().select('-__v').limit(20);
    res.json(npcs);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.getNPCById = async (req, res) => {
  try {
    const npc = await NPC.findById(req.params.id).populate('friends', 'username avatar');
    if (!npc) return res.status(404).json({ message: 'NPC không tồn tại' });
    res.json(npc);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.sendFriendRequest = async (req, res) => {
  const userId = req.body.userId;
  try {
    const npc = await NPC.findById(req.params.id);
    if (!npc) return res.status(404).json({ message: 'NPC không tồn tại' });

    if (!npc.friends.includes(userId)) {
      npc.friends.push(userId);
      await npc.save();
    }

    res.json({ message: 'Đã gửi kết bạn với NPC', npc });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
