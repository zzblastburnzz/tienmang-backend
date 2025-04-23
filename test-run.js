const mongoose = require('mongoose');
const { npcReactToFeed } = require('./services/npcReactToFeed');

mongoose.connect('mongodb://localhost:27017/tienmang', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

npcReactToFeed().then(() => {
  console.log('✅ NPC phản hồi thành công!');
  process.exit();
});
