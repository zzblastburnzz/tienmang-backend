
const User = require('../models/user.model');
const NPC = require('../models/npc.model');
const Post = require('../models/post.model');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Ưu tiên tìm ở bảng User trước
    let user = await User.findById(userId).select('-password');
    if (!user) {
      user = await NPC.findById(userId).select('-__v');
      if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng hoặc NPC' });
    }

    const posts = await Post.find({ author: userId })
      .sort({ postedAt: -1 })
      .limit(20);

    const friends = await Promise.all(
      (user.friends || []).map(async (fid) => {
        const u = await User.findById(fid).select('username avatar');
        return u;
      })
    );

    res.json({
      user,
      posts,
      friends: friends.filter(f => f !== null)
    });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy profile', error: err.message });
  }
};
