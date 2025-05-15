// chat.route.js (tích hợp nhắc nhở NPC)
const express = require('express');
const router = express.Router();
const {
  startConversation,
  getMessages,
  sendMessage,
  sendReminder
} = require('../controllers/chat.controller');

router.post('/start', startConversation);                // Bắt đầu chat
router.get('/:id', getMessages);                         // Lấy lịch sử
router.post('/:id', sendMessage);                        // Gửi tin nhắn + AI trả lời nếu cần
router.post('/remind', sendReminder);                    // NPC gửi nhắc nhở / xác nhận nhiệm vụ

module.exports = router;