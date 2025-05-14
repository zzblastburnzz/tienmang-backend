
const Npc = require('../models/npc.model');

/**
 * Cho 2 NPC tương tác qua bất kỳ hình thức nào: chat, feed, nhiệm vụ, truyền danh...
 * @param {string} npcAId - NPC thực hiện ghi nhớ
 * @param {string} npcBId - NPC được ghi nhận
 * @param {string} reason - Lý do biết (chat, feed, mission, danh tiếng...)
 * @param {string} mood - Cảm xúc ghi lại (thân thiện, tò mò, kính nể, trung lập...)
 */
async function npcInteract(npcAId, npcBId, reason = 'tương tác', mood = 'trung lập') {
  const npcA = await Npc.findById(npcAId);
  const npcB = await Npc.findById(npcBId);

  if (!npcA || !npcB) {
    throw new Error('Không tìm thấy NPC tương tác');
  }

  if (!npcA.knownPeople.includes(npcB._id)) {
    npcA.knownPeople.push(npcB._id);
  }

  npcA.memoryLog.push({
    event: `Biết ${npcB.name} qua ${reason}`,
    target: npcB._id,
    date: new Date(),
    mood
  });

  // Danh tiếng cao gây thêm ấn tượng
  if (npcB.socialReputation >= 800 && !npcA.fameTags.includes('biết qua danh tiếng')) {
    npcA.fameTags.push('biết qua danh tiếng');
    npcA.memoryLog.push({
      event: `Nghe danh tiếng của ${npcB.name}`,
      target: npcB._id,
      date: new Date(),
      mood: 'kính nể'
    });
  }

  await npcA.save();
  return npcA;
}

module.exports = npcInteract;
