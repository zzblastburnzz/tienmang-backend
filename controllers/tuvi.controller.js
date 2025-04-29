
const User = require('../models/character.model');
const { canBreakThrough, TUVICHAIN } = require('../utils/tuvi.service');

exports.breakthrough = async (req, res) => {
  const userId = req.body.userId;

  try {
    const character = await Character.findById(characterId);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy nhân vật' });

    const nextTuVi = canBreakThrough(user);
    if (!nextTuVi) {
      return res.status(400).json({ message: 'Chưa đủ điều kiện đột phá tu vi' });
    }

    user.realTuVi = nextTuVi;
    user.showTuVi = nextTuVi;
    user.createdAt = new Date(); // reset thời gian ở cấp mới
    user.soGioBeQuan = 0;

    await user.save();

    res.json({ message: 'Đột phá thành công!', newTuVi: nextTuVi });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server khi đột phá tu vi', error: err.message });
  }
};
