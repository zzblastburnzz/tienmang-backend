
const { TUVICHAIN } = require('./tuvi.service');

function getTuViRank(tuvi) {
  return TUVICHAIN.indexOf(tuvi || 'Phàm nhân');
}

function canJoinFaction(user, faction) {
  const userRank = getTuViRank(user.realTuVi);
  const requiredRank = getTuViRank(faction.minTuVi || 'Phàm nhân');
  return userRank >= requiredRank;
}

module.exports = { canJoinFaction };
