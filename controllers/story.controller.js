
const Story = require('../models/story.model');

exports.getTodayStories = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stories = await Story.find({ postedAt: { $gte: today } })
      .sort({ postedAt: -1 })
      .populate('npc', 'username avatar mood');

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy story hôm nay', error: err.message });
  }
};

exports.reactToStory = async (req, res) => {
  const { userId, emoji } = req.body;
  try {
    const story = await Story.findById(req.params.id);
    if (!story) return res.status(404).json({ message: 'Story không tồn tại' });

    const existing = story.reactions.find(r => r.user.toString() === userId);
    if (existing) {
      existing.emoji = emoji;
      existing.reactedAt = new Date();
    } else {
      story.reactions.push({ user: userId, emoji });
    }

    await story.save();
    res.json({ message: 'Đã phản hồi story', story });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi react story', error: err.message });
  }
};

exports.getReactedStories = async (req, res) => {
  const { userId } = req.params;
  try {
    const stories = await Story.find({ 'reactions.user': userId })
      .sort({ postedAt: -1 })
      .populate('npc', 'username avatar');

    res.json(stories);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy lịch sử reacted story', error: err.message });
  }
};
