// npc-cron.js (Cron chạy phản ứng mạng xã hội tự động của NPC)
const cron = require('node-cron');
const mongoose = require('mongoose');
const { npcReactToFeed } = require('./services/npcReactToFeed');

mongoose.connect('mongodb://localhost:27017/tienmang', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

cron.schedule('0 */2 * * *', async () => {
  console.log('🌀 NPC phản ứng feed tự động đang chạy...');
  await npcReactToFeed();
}, {
  timezone: 'Asia/Ho_Chi_Minh'
});
