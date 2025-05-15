// services/npcReactToFeed.js (nâng cấp: tạo drama + ảnh hưởng danh tiếng)
const Npc = require('../models/npc.model');
const Post = require('../models/post.model');
const Comment = require('../models/comment.model');
const SocialLink = require('../models/sociallink.model');
const { generateNpcReactionToPost } = require('../utils/generateNpcReactionToPost');
const { generateNpcDramaComment } = require('../utils/generateNpcDramaComment');

async function npcReactToFeed() {
  const npcs = await Npc.find({}).populate('memoryLog.target');
  const recentPosts = await Post.find({}).sort({ createdAt: -1 }).limit(20).populate('author');

  for (const npc of npcs) {
    for (const post of recentPosts) {
      if (String(post.author._id) === String(npc._id)) continue;

      const relation = await SocialLink.findOne({ from: npc._id, to: post.author._id });
      const score = relation?.score ?? 50;

      // tỷ lệ phản ứng 25%
      if (Math.random() < 0.25) {
        let text = '';
        let isDrama = false;

        const matchingMemories = npc.memoryLog?.filter(mem => String(mem.target?._id) === String(post.author._id));
        if (score < 40 && matchingMemories.length > 0) {
          text = generateNpcDramaComment(npc, post.author, matchingMemories, npc.behavior?.attitude);
          isDrama = true;
        } else {
          text = generateNpcReactionToPost(npc, post.author, score);
        }

        await Comment.create({
          postId: post._id,
          author: npc._id,
          content: text
        });

        // ➕ Cập nhật danh tiếng post.author dựa trên phản hồi
        const delta = isDrama ? -3 : +1;
        await Npc.findByIdAndUpdate(post.author._id, {
          $inc: { socialReputation: delta }
        });
      }
    }
  }

  console.log('✅ NPC đã phản ứng với các bài viết gần đây (bao gồm drama nếu có + cập nhật danh tiếng).');
}

module.exports = { npcReactToFeed };
