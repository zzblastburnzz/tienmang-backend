
const Post = require('../models/post.model');

exports.createPost = async (req, res) => {
  try {
    const { author, content, image, mood } = req.body;
    const post = await Post.create({ author, content, image, mood });
    res.status(201).json({ message: 'Tạo bài viết thành công', post });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi tạo bài viết', error: err.message });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ postedAt: -1 })
      .populate('author', 'username avatar')
      .limit(30);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi lấy bài viết', error: err.message });
  }
};

exports.reactToPost = async (req, res) => {
  try {
    const { userId, type } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại' });

    const existing = post.reactions.find(r => r.user.toString() === userId);
    if (existing) {
      existing.type = type; // cập nhật loại cảm xúc
    } else {
      post.reactions.push({ user: userId, type });
    }

    await post.save();
    res.json({ message: 'Đã cập nhật cảm xúc', post });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi react', error: err.message });
  }
};

exports.commentOnPost = async (req, res) => {
  try {
    const { userId, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Bài viết không tồn tại' });

    post.comments.push({ user: userId, text });
    await post.save();

    res.json({ message: 'Đã bình luận', post });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi bình luận', error: err.message });
  }
};
