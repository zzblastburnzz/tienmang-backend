// utils/generateNpcReactionToPost.js
function generateNpcReactionToPost(npc, postAuthor, relationshipScore = 50) {
  const name = npc.name || 'NPC';
  const attitude = npc.behavior?.attitude || 'trung lập';

  const friendly = relationshipScore > 70;
  const hostile = relationshipScore < 30;

  if (friendly) {
    return `${name} chia sẻ: “Bài này hay lắm, đúng kiểu đạo hữu ${postAuthor.name} rồi!”`;
  }

  if (hostile) {
    const dramaLines = {
      'nóng tính': `Lại là ngươi ${postAuthor.name}? Viết cái gì thế này!`,
      'nghiêm khắc': `Nội dung bài ${postAuthor.name} khiến ta thật thất vọng.`,
      'bí ẩn': `Ta nghe đồn ${postAuthor.name} có ý đồ... Ai biết thực hư ra sao?`,
      'lắm lời': `Chỉ toàn nói nhảm như mọi khi. Đừng tin hắn quá.`,
      'hòa nhã': `Có vẻ bài viết này hơi phiến diện, ta không đồng tình lắm.`
    };
    return `${name} phản ứng: “${dramaLines[attitude] || 'Ta thấy khó mà tin nổi điều này.'}”`;
  }

  return `${name} nhận xét: “Một bài viết thú vị từ ${postAuthor.name}.”`;
}

module.exports = { generateNpcReactionToPost };
