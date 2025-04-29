
const User = require('../models/character.model');

const TUVICHAIN = [
  'Phàm nhân',
  'Luyện Khí',
  'Trúc Cơ',
  'Kim Đan',
  'Nguyên Anh',
  'Hóa Thần',
  'Phân Thần',
  'Hợp Thể',
  'Đại Thừa',
  'Chuẩn Đạo',
  'Thiên Đạo'
];

// Điều kiện lên cấp tu vi
const TUVI_CONDITIONS = {
  'Phàm nhân': { days: 1, ngoTinh: 15, beQuan: 1 },
  'Luyện Khí': { days: 2, ngoTinh: 25, beQuan: 3 },
  'Trúc Cơ': { days: 4, ngoTinh: 35, beQuan: 5 },
  'Kim Đan': { days: 6, ngoTinh: 45, beQuan: 8 },
  'Nguyên Anh': { days: 10, ngoTinh: 60, beQuan: 12 },
  'Hóa Thần': { days: 14, ngoTinh: 70, beQuan: 16 }
  // ... tiếp tục nếu muốn
};

function getTuViRank(tuvi) {
  return TUVICHAIN.indexOf(tuvi);
}

// Kiểm tra điều kiện lên cấp tu vi
function canBreakThrough(data) {
  const current = data.realTuVi;
  const nextRank = getTuViRank(current) + 1;
  if (nextRank >= TUVICHAIN.length) return null;

  const condition = TUVI_CONDITIONS[current];
  if (!condition) return null;

  return (
    data.ngoTinh >= condition.ngoTinh &&
    data.soGioBeQuan >= condition.beQuan &&
    (Date.now() - new Date(data.createdAt)) / (1000 * 60 * 60 * 24) >= condition.days
  ) ? TUVICHAIN[nextRank] : null;
}

// Truyền công (nếu là bạn thân hoặc sư đồ)
async function transmitPower(fromId, toId) {
  try {
    const [from, to] = await Promise.all([
      User.findById(fromId),
      User.findById(toId)
    ]);

    if (!from || !to) return null;

    const fromRank = getTuViRank(from.realTuVi);
    const toRank = getTuViRank(to.realTuVi);

    if (fromRank - toRank >= 4) {
      to.soGioBeQuan += 1.5;
      await to.save();
      return { message: 'Truyền công thành công, người nhận tăng tu lực.' };
    } else {
      return { message: 'Tu vi không đủ để truyền công.' };
    }
  } catch (err) {
    return { message: 'Truyền công thất bại rồi', error: err.message };
  }
}

module.exports = {
  canBreakThrough,
  transmitPower,
  TUVICHAIN
};
