// utils/generateNpcPostByRole.js (nâng cấp cá nhân hóa theo attitude)
function generateNpcPostByRoleAndAttitude(npc) {
  const name = npc.name || 'NPC';
  const role = npc.role || 'phàm dân';
  const attitude = npc.behavior?.attitude || 'hòa nhã';

  const templates = {
    'quán chủ': [
      `Hôm nay quán ta có món trà mới, ai muốn thử nào? ☕`,
      `Ngươi ghé quán ta chưa? Trà hoa nhài vừa hạ sơn đó! 🌼`
    ],
    'tông chủ': [
      `Tông môn ta đang tuyển đệ tử mới. Ai có linh căn tốt thì đến gặp ta!`,
      `Tu hành là việc cả đời. Hãy tìm cho mình một con đường xứng đáng.`
    ],
    'lang y': [
      `Vừa luyện được lò thuốc trị nội thương. Ai cần cứ đến gặp ta.`,
      `Chớ coi thường những vết thương nhỏ. Một giọt máu hôm nay, một cái mạng ngày mai.`
    ],
    'thợ rèn': [
      `Mới hoàn thành một thanh kiếm băng tinh. Ai thử không? ⚔️`,
      `Lò rèn mở lại rồi! Đến đúc binh khí đi các đạo hữu.`
    ],
    'học giả': [
      `Tri thức là gốc rễ tu hành. Hôm nay ta viết một bài luận về linh khí.`,
      `Ta vừa phát hiện một quy luật kỳ lạ trong lịch âm dương.`
    ],
    'tiểu nhị': [
      `Khách đông quá, ta chạy mỏi chân rồi đây!`,
      `Bếp hôm nay cháy lớn! Nhưng đồ ăn vẫn thơm phức nha!`
    ],
    'phàm dân': [
      `Ngày qua ngày ta chỉ biết làm ruộng. Có ai muốn đổi đời không?`,
      `Cuộc sống ở Phượng Thành chẳng có gì lạ... nhưng đáng sống.`
    ]
  };

  const attitudeTones = {
    'nghiêm khắc': 'Người không tự giác thì sớm muộn cũng gặp báo ứng.',
    'nóng tính': 'Ai mà dám xem thường thì liệu hồn đó!',
    'lắm lời': 'À mà còn nữa, chuyện này chưa hết đâu...',
    'bí ẩn': 'Có những điều không nên nói ra, chỉ nên cảm nhận.',
    'hòa nhã': 'Chúc mọi người một ngày tu luyện an lành nhé.'
  };

  const pool = templates[role] || templates['phàm dân'];
  const basePost = pool[Math.floor(Math.random() * pool.length)];
  const tone = attitudeTones[attitude] || '';

  return `${name} viết: “${basePost} ${tone}”`;
}

module.exports = { generateNpcPostByRoleAndAttitude };
