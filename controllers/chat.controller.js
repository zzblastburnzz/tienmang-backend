
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const NPC = require('../models/npc.model');

// Giả lập phản hồi AI (sau này có thể gọi OpenAI API)
const generateAIReply = (npcName, userMessage) => {
  return `(${npcName} 🤖): Ta nghe ngươi nói "${userMessage}". Hãy kể thêm đi!`;
};

exports.startConversation = async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    let convo = await Conversation.findOne({ members: { $all: [senderId, receiverId] } });
    if (!convo) {
      convo = await Conversation.create({ members: [senderId, receiverId] });
    }
    res.status(201).json({ message: 'Conversation sẵn sàng', conversation: convo });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi tạo conversation', error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy messages', error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { sender, text } = req.body;
  const conversationId = req.params.id;

  try {
    const message = await Message.create({ conversationId, sender, text });
    const convo = await Conversation.findById(conversationId).populate('members');

    // Kiểm tra nếu người nhận là NPC thì tạo phản hồi AI
    const npcReceiver = convo.members.find(m => m._id.toString() !== sender);
    const npcInfo = await NPC.findById(npcReceiver?._id);

    if (npcInfo) {
      const aiText = generateAIReply(npcInfo.username, text);
      const aiMessage = await Message.create({
        conversationId,
        sender: npcInfo._id,
        text: aiText
      });
      return res.status(201).json([message, aiMessage]);
    }

    res.status(201).json([message]);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi message', error: err.message });
  }
};
