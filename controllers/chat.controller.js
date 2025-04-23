// chat.controller.js (nâng cấp phản hồi theo behavior)
const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');
const NPC = require('../models/npc.model');
const SocialLink = require('../models/sociallink.model');
const { createJobFromChat } = require('../services/jobGeneratorFromChat');
const { generateNpcReplyWithBehavior } = require('../utils/generateNpcReply');

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

    const npcReceiver = convo.members.find(m => m._id.toString() !== sender);
    const npcInfo = await NPC.findById(npcReceiver?._id);

    let responseMessages = [message];

    if (npcInfo) {
      // 🔥 Phản hồi theo behavior thay vì prompt cứng
      const reply = generateNpcReplyWithBehavior({
        name: npcInfo.name,
        attitude: npcInfo.behavior?.attitude || 'hòa nhã',
        role: npcInfo.role || '',
        message: `Ngươi nói "${text}" sao?`
      });
      const aiMessage = await Message.create({ conversationId, sender: npcInfo._id, text: reply });
      responseMessages.push(aiMessage);

      // Tạo job từ nội dung chat (nếu có)
      const generatedJob = await createJobFromChat(text, npcInfo._id, sender);
      if (generatedJob) {
        const notice = await Message.create({
          conversationId,
          sender: npcInfo._id,
          text: `Ta sẽ giao nhiệm vụ này cho ngươi: ${generatedJob.title}. Muốn nhận chứ?`
        });
        responseMessages.push(notice);
      }
    }

    res.status(201).json(responseMessages);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi gửi message', error: err.message });
  }
};
