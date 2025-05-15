
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.route');
const characterRoutes = require('./routes/character.route');
const postRoutes = require('./routes/post.route');
const chatRoutes = require('./routes/chat.route');
const storyRoutes = require('./routes/story.route');
const feedRoutes = require('./routes/feed.route');
const tuviRoutes = require('./routes/tuvi.route');
const worldRoutes = require('./routes/world.route');
const factionRoutes = require('./routes/faction.route');
const socialLinkRoutes = require('./routes/sociallink.route');

app.use('/auth', authRoutes);
app.use('/character', characterRoutes);
app.use('/posts', postRoutes);
app.use('/chat', chatRoutes);
app.use('/stories', storyRoutes);
app.use('/feed', feedRoutes);
app.use('/tuvi', tuviRoutes);
app.use('/worlds', worldRoutes);
app.use('/factions', factionRoutes);
app.use('/sociallink', socialLinkRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Đã kết nối MongoDB'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

module.exports = app;
