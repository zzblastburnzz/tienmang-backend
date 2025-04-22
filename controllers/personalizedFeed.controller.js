
const Post = require('../models/post.model');
const Conversation = require('../models/conversation.model');
const User = require('../models/user.model');
const NPC = require('../models/npc.model');

const compatiblePersonalities = {
  friendly: ['humorous', 'moody', 'friendly'],
  quiet: ['mysterious', 'friendly'],
  moody: ['quiet', 'mysterious', 'moody'],
  humorous: ['friendly', 'humorous'],
  mysterious: ['quiet', 'moody']
};

exports.getPersonalizedFeed = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Không tìm thấy user' });

    const friends = user.friends.map(id => id.toString());

    const conversations = await Conversation.find({ members: userId });
    const chatPartners = conversations.flatMap(c => c.members.map(id => id.toString()))
                                       .filter(id => id !== userId);

    const allPosts = await Post.find()
      .sort({ postedAt: -1 })
      .populate('author', 'username avatar mood personality');

    const scored = allPosts.map(post => {
      let score = 0;

      const authorId = post.author._id.toString();
      const authorMood = post.mood || 'neutral';
      const authorPersonality = post.author.personality || 'friendly';

      if (friends.includes(authorId)) score += 3;
      if (chatPartners.includes(authorId)) score += 2;
      if (authorMood === user.mood) score += 2;

      const preferred = compatiblePersonalities[user.personality] || [];
      if (preferred.includes(authorPersonality)) score += 1;

      return { post, score };
    });

    scored.sort((a, b) => b.score - a.score);

    res.json(scored.map(s => s.post));
  } catch (err) {
    res.status(500).json({ message: 'Lỗi feed cá nhân hóa', error: err.message });
  }
};
