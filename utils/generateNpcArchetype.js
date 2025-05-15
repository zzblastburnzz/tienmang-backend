// utils/generateNpcArchetype.js

function generateNpcArchetype(baseData = {}) {
  const roles = ['quán chủ', 'tông chủ', 'học giả', 'thợ rèn', 'lang y', 'tiểu nhị'];
  const jobTypes = ['tuyển dụng', 'lao động', 'giao thương', 'giám sát'];
  const attitudes = ['hòa nhã', 'nghiêm khắc', 'nóng tính', 'lắm lời', 'bí ẩn'];

  const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

  return {
    ...baseData,
    role: randomFrom(roles),
    jobType: randomFrom(jobTypes),
    behavior: {
      attitude: randomFrom(attitudes),
      activeHours: [
        Math.floor(Math.random() * 6 + 6), // giờ bắt đầu từ 6–11h
        Math.floor(Math.random() * 6 + 13) // giờ tiếp theo từ 13–18h
      ]
    },
    relationshipTags: []
  };
}

module.exports = { generateNpcArchetype };
