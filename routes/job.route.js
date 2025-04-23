// routes/job.route.js (API nhận nhiệm vụ)
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

module.exports = router;
