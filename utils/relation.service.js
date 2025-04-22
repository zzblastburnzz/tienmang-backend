
const SocialLink = require('../models/socialLink.model');

function getTypeFromScore(score) {
  if (score <= -50) return 'enemy';
  if (score < 0) return 'neutral';
  if (score <= 30) return 'acquaintance';
  if (score <= 70) return 'friend';
  if (score <= 99) return 'close';
  return 'soulmate';
}

async function updateRelation(userA, userB, scoreDelta) {
  try {
    // Luôn sắp xếp theo ID để đảm bảo chỉ có 1 record cho mỗi cặp
    const [id1, id2] = [userA.toString(), userB.toString()].sort();

    let link = await SocialLink.findOne({ userA: id1, userB: id2 });
    if (!link) {
      link = new SocialLink({ userA: id1, userB: id2, score: 0, type: 'neutral' });
    }

    link.score += scoreDelta;
    link.score = Math.max(-100, Math.min(100, link.score)); // Giới hạn điểm
    link.type = getTypeFromScore(link.score);
    link.updatedAt = new Date();

    await link.save();
    return link;
  } catch (err) {
    console.error('Lỗi cập nhật quan hệ:', err.message);
    return null;
  }
}

module.exports = { updateRelation };
