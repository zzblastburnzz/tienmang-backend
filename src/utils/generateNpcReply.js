// utils/generateNpcReply.js

function generateNpcReplyWithBehavior({ name, attitude, role, message }) {
  const polite = (text) => `${name} nói một cách nhẹ nhàng: "${text}"`;
  const harsh = (text) => `${name} gằn giọng: "${text}"`;
  const snarky = (text) => `${name} cười khẩy: "${text}"`;

  let prefix = '';
  switch (attitude) {
    case 'nghiêm khắc': prefix = harsh; break;
    case 'nóng tính': prefix = harsh; break;
    case 'lắm lời': prefix = (text) => `${name} huyên thuyên: "${text}... mà ngươi nghe ta nói xong đã!"`; break;
    case 'bí ẩn': prefix = (text) => `${name} nở nụ cười mơ hồ: "${text}... Có khi vậy, có khi không."`; break;
    default: prefix = polite;
  }

  // Gợi ý vai trò nếu có
  const roleHint = role.includes('quán') ? 'Nếu rảnh, ghé quán ta một chuyến nhé.' :
                   role.includes('tông chủ') ? 'Trong tông ta đang thiếu nhân tài.' :
                   '';

  return prefix(`${message}${roleHint ? ' ' + roleHint : ''}`);
}

module.exports = { generateNpcReplyWithBehavior };
