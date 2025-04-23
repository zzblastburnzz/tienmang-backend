// utils/generateNpcDramaComment.js
function generateNpcDramaComment(npc, target, memory = [], attitude = 'trung lập') {
  const name = npc.name || 'NPC';
  const targetName = target.name || 'người kia';

  // Drama từ trí nhớ/mối quan hệ
  const hasHistory = memory.filter(m => String(m.target) === String(target._id));
  const recentDrama = hasHistory.length > 0 ? hasHistory[0].event : null;

  // Phản ứng theo tình huống
  const dramaTemplates = {
    'tranh khách': `Hừm, ${targetName} từng giành khách với ta ở Phượng Thành. Ai tin được hắn?`,
    'bị từ chối': `Ta từng mời ${targetName} tham gia tông môn, hắn chê tông ta nhỏ bé đấy.`,
    'từng ghen tỵ': `Năm xưa ${targetName} ganh tỵ khi ta được chọn làm trưởng nhóm. Giờ lại đăng bài dạy đạo à?`,
    'vay tiền': `Đăng bài nghe hay lắm, chứ ta còn chưa đòi được món nợ ${targetName} vay tháng trước.`
  };

  // Dựa vào thái độ nếu không có memory
  const attitudeTone = {
    'nóng tính': `Ta thấy chướng tai gai mắt khi thấy bài của ${targetName}.`,
    'nghiêm khắc': `Nội dung của ${targetName} thiếu tính tu dưỡng.`,
    'bí ẩn': `Có lẽ ${targetName} không nói hết sự thật đâu.`,
    'lắm lời': `Ta không biết nói sao với ${targetName} nữa. Dài dòng, dối lòng.`,
    'hòa nhã': `Mỗi người một con đường... nhưng ta có chút nghi ngờ.`
  };

  if (recentDrama && dramaTemplates[recentDrama]) {
    return `${name} phản ứng: “${dramaTemplates[recentDrama]}”`;
  }

  return `${name} nhận xét: “${attitudeTone[attitude] || 'Ta không bình luận gì thêm...'}”`;
}

module.exports = { generateNpcDramaComment };
