
const Post = require('../models/post.model');
const Character = require('../models/character.model');

const moodOptions = ['happy', 'sad', 'neutral'];
const captions = [
  'Hôm nay thật tuyệt!',
  'Mọi thứ ổn chứ?',
  'Tu luyện cần kiên trì...',
  'Ai đó rủ ta đi dạo dưới trăng?',
  'Ta vừa học thêm một bí kíp mới!',
  'Cảm thấy lặng yên giữa thế giới ồn ào...'
];

const personalityPostRanges = {
  friendly: [2, 4],
  quiet: [0, 2],
  moody: [1, 3],
  humorous: [3, 5],
  mysterious: [0, 1]
};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function runAutoPost() {
  try {
    const now = new Date();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const characters = await Character.find();

    for (const npc of npcs) {
      const todayPosts = await Post.find({
        author: npc._id,
        postedAt: { $gte: startOfDay }
      });

      const range = personalityPostRanges[npc.personality] || [1, 2];
      const maxPostsToday = getRandomInt(range[0], range[1]);

      if (todayPosts.length < maxPostsToday) {
        const post = await Post.create({
          author: character._id,
          content: pickRandom(captions),
          mood: pickRandom(moodOptions),
          image: '',
          postedAt: now
        });

        console.log(`📢 NPC ${character.username} vừa đăng bài tự động lúc ${now.toLocaleTimeString()}`);
      }
    }

  } catch (err) {
    console.error('Lỗi autoPost:', err.message);
  }
}

module.exports = { runAutoPost };
