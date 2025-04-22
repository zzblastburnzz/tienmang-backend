
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.route');
const npcRoutes = require('./routes/npc.route');
const postRoutes = require('./routes/post.route');
const chatRoutes = require('./routes/chat.route');
const storyRoutes = require('./routes/story.route');
const profileRoutes = require('./routes/profile.route');
const feedRoutes = require('./routes/feed.route');

app.use('/auth', authRoutes);
app.use('/npcs', npcRoutes);
app.use('/posts', postRoutes);
app.use('/chat', chatRoutes);
app.use('/stories', storyRoutes);
app.use('/profile', profileRoutes);
app.use('/feed', feedRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

module.exports = app;
