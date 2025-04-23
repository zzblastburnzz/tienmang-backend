// routes/job.route.js (gộp route chat + job board)
const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

// User nhận nhiệm vụ
router.post('/accept', async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Không tìm thấy nhiệm vụ' });

    job.assignedTo = userId;
    await job.save();

    res.status(200).json({ message: 'Đã nhận nhiệm vụ thành công', job });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi nhận nhiệm vụ', error: err.message });
  }
});

// Đăng job chính thức từ NPC/User
router.post('/', async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, type: 'board' });
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo job', error: err.message });
  }
});

// Lọc job theo location (giới – châu – thành)
router.get('/', async (req, res) => {
  try {
    const { gioi, chau, thanh } = req.query;
    const query = { type: 'board' };
    if (gioi) query['location.gioi'] = gioi;
    if (chau) query['location.chau'] = chau;
    if (thanh) query['location.thanh'] = thanh;

    const jobs = await Job.find(query).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách job', error: err.message });
  }
});

// Lấy job theo tiêu đề (dùng cho luồng chat)
router.get('/by-title', async (req, res) => {
  try {
    const { title } = req.query;
    const job = await Job.findOne({ title });
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tìm job theo tiêu đề', error: err.message });
  }
});

module.exports = router;