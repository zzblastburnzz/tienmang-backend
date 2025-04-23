// seeder_archetype_npcs.js
const mongoose = require('mongoose');
const Npc = require('../models/npc.model');
const { generateNpcArchetype } = require('../utils/generateNpcArchetype');

const seedArchetypeNpcs = async () => {
  const baseNpcs = [
    { name: 'Trần Nhị', username: 'tran.nhi', gioi: 'Nhân Giới', chau: 'Đông Châu', thanh: 'Phượng Thành' },
    { name: 'Lý Tam', username: 'ly.tam', gioi: 'Nhân Giới', chau: 'Tây Châu', thanh: 'Hổ Thành' },
    { name: 'Phạm Tứ', username: 'pham.tu', gioi: 'Linh Giới', chau: 'Nam Châu', thanh: 'Lan Thành' },
    { name: 'Vũ Ngũ', username: 'vu.ngu', gioi: 'Yêu Giới', chau: 'Bắc Châu', thanh: 'Long Thành' },
    { name: 'Đào Lục', username: 'dao.luc', gioi: 'Ma Giới', chau: 'Tây Châu', thanh: 'Diêm Thành' }
  ];

  const enrichedNpcs = baseNpcs.map(generateNpcArchetype);
  await Npc.insertMany(enrichedNpcs);
  console.log('✅ Đã seed NPC mẫu có nghề nghiệp và hành vi.');
};

mongoose.connect('mongodb://localhost:27017/tienmang', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Npc.deleteMany({});
    await seedArchetypeNpcs();
    mongoose.disconnect();
  });
