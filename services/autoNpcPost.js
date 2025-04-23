// services/autoNpcPost.js (gọi hàm mới có attitude)
const Npc = require('../models/npc.model');
const Post = require('../models/post.model');
const { generateNpcPostByRoleAndAttitude } = require('../utils/generateNpcPostByRole');

// Hàm tạo bài viết định kỳ cho NPC dựa vào nghề nghiệp và tính cách
async function autoNpcPost() {
  const npcs = await Npc.find({});

  for (const npc of npcs) {
    const text = generateNpcPostByRoleAndAttitude(npc);
    await Post.create({
      author: npc._id,
      content: text,
      createdAt: new Date(),
      tags: ['npc', 'rolepost']
    });
  }

  console.log(`✅ Đã tạo ${npcs.length} bài viết cho NPC theo nghề + tính cách.`);
}

module.exports = { autoNpcPost };
