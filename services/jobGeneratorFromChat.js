// services/jobGeneratorFromChat.js (bổ sung phần thưởng)
const Job = require('../models/job.model');

/**
 * Hàm tạo job từ nội dung chat nếu có ý định giúp đỡ NPC
 * @param {string} message - Tin nhắn của user
 * @param {ObjectId} npcId - ID của NPC giao nhiệm vụ
 * @param {ObjectId} userId - ID của user đề xuất
 * @returns {Job|null} - Trả về job mới nếu tạo, null nếu không
 */
async function createJobFromChat(message, npcId, userId) {
  const keywordMap = [
    {
      trigger: /biển hiệu|thiết kế.*quán/,
      job: {
        title: 'Thiết kế biển hiệu cho quán trà',
        description: 'Giúp NPC tạo một biển hiệu thật bắt mắt cho quán mới mở.',
        reward: { coins: 400, exp: 20, favor: 5 },
        type: 'chat'
      }
    },
    {
      trigger: /phụ bán|giúp bán|trông quán/,
      job: {
        title: 'Phụ bán quán trà chiều',
        description: 'Hỗ trợ bán hàng cho NPC trong giờ cao điểm.',
        reward: { coins: 300, favor: 2 },
        type: 'chat'
      }
    },
    {
      trigger: /viết thơ|quảng bá|truyền thông/,
      job: {
        title: 'Viết văn truyền bá cho quán trà',
        description: 'Sáng tác thơ ca hoặc bài viết truyền bá giúp NPC thu hút khách.',
        reward: { coins: 600, item: 'Bút ngọc thư pháp' },
        type: 'chat'
      }
    }
  ];

  for (const item of keywordMap) {
    if (item.trigger.test(message.toLowerCase())) {
      const job = await Job.create({
        ...item.job,
        employer: npcId,
        assignedTo: userId,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // 3 ngày
      });
      return job;
    }
  }
  return null;
}

module.exports = { createJobFromChat };
