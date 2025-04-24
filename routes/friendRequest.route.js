// routes/friendRequest.route.js
const express = require('express');
const router = express.Router();
const FriendRequest = require('../models/friendRequest.model');
const SocialLink = require('../models/sociallink.model');

// Gửi lời mời kết bạn
router.post('/', async (req, res) => {
  const { from, to } = req.body;
  try {
    const existing = await FriendRequest.findOne({ from, to, status: 'pending' });
    if (existing) return res.status(400).json({ message: 'Đã gửi lời mời trước đó' });

    const request = await FriendRequest.create({ from, to });
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi lời mời', error: err.message });
  }
});

// Danh sách lời mời đến
router.get('/received/:userId', async (req, res) => {
  try {
    const requests = await FriendRequest.find({ to: req.params.userId, status: 'pending' }).populate('from');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy lời mời đến', error: err.message });
  }
});

// Danh sách lời mời đã gửi
router.get('/sent/:userId', async (req, res) => {
  try {
    const requests = await FriendRequest.find({ from: req.params.userId, status: 'pending' }).populate('to');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy lời mời đã gửi', error: err.message });
  }
});

// Chấp nhận lời mời
router.post('/accept', async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await FriendRequest.findByIdAndUpdate(requestId, { status: 'accepted' }, { new: true });
    await SocialLink.create({ from: request.from, to: request.to, score: 60 });
    await SocialLink.create({ from: request.to, to: request.from, score: 60 });
    res.json({ message: 'Đã kết bạn thành công', request });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi chấp nhận lời mời', error: err.message });
  }
});

// Từ chối lời mời
router.post('/reject', async (req, res) => {
  const { requestId } = req.body;
  try {
    const request = await FriendRequest.findByIdAndUpdate(requestId, { status: 'rejected' }, { new: true });
    res.json({ message: 'Đã từ chối lời mời', request });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi từ chối lời mời', error: err.message });
  }
});

module.exports = router;
