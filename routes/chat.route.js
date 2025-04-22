
const express = require('express');
const router = express.Router();
const {
  startConversation,
  getMessages,
  sendMessage
} = require('../controllers/chat.controller');

router.post('/start', startConversation);                // Bắt đầu chat
router.get('/:id', getMessages);                         // Lấy lịch sử
router.post('/:id', sendMessage);                        // Gửi tin nhắn + AI trả lời nếu cần

module.exports = router;
