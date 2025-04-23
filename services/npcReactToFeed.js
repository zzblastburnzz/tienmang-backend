// services/npcReactToFeed.js
const Npc = require('../models/npc.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const { generateNpcReactionToPost } = require('../utils/generateNpcReactionToPost');
const SocialLink = require('../models/sociallink.model');

// NPC phản ứng với các bài viết theo quan hệ xã hội
async function npcReactToFeed() {
  const npcs = await Npc.find({});
  const recentPosts = await Post.find({}).sort({ createdAt: -1 }).limit(20).populate('author');

  for (const npc of npcs) {
    for (const post of recentPosts) {
      if (String(post.author._id) === String(npc._id)) continue; // bỏ qua bài của chính mình

      const relation = await SocialLink.findOne({ from: npc._id, to: post.author._id });
      const score = relation?.score ?? 50;

      // tỷ lệ phản ứng 25%
      if (Math.random() < 0.25) {
        const text = generateNpcReactionToPost(npc, post.author, score);
        await Comment.create({ postId: post._id, author: npc._id, content: text });
      }
    }
  }

  console.log('✅ NPC đã phản ứng với các bài viết gần đây.');
}

module.exports = { npcReactToFeed };
