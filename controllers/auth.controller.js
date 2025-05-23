
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');

exports.register = async (req, res) => {
 console.log('🔥 [Register] req.body:', req.body); // 🔥 THÊM DÒNG NÀY
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'Username đã tồn tại' });

    const user = await User.create({ username, password });
    res.status(201).json({ message: 'Đăng ký thành công', user });
  } catch (err) {
  console.error('🔥 [Register] Error:', err); // 🔥 THÊM DÒNG LOG LỖI CHI TIẾT
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Sai tên đăng nhập hoặc mật khẩu' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    res.json({ message: 'Đăng nhập thành công', token, user });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi server', error: err.message });
  }
};
