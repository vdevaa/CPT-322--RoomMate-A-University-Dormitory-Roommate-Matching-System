import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';

async function requireParticipant(conversationId, userId) {
  const convo = await Conversation.findById(conversationId);
  if (!convo) return null;
  const isParticipant = convo.participants.map(String).includes(String(userId));
  const isActive = convo.activeFor.map(String).includes(String(userId));
  if (!isParticipant || !isActive) return null;
  return convo;
}

export const listMessages = async (req, res, next) => {
  try {
    const me = req.user.sub || req.user.id || req.user._id || req.user;
    const { id } = req.params;
    const convo = await requireParticipant(id, me);
    if (!convo) return res.status(404).json({ error: 'Conversation not found' });
    const msgs = await Message.find({ conversation: id }).sort({ sentAt: 1 }).lean();
    res.json(msgs);
  } catch (e) { next(e); }
};

export const sendMessage = async (req, res, next) => {
  try {
    const me = req.user.sub || req.user.id || req.user._id || req.user;
    const { id } = req.params;
    const { text } = req.body || {};
    if (!text || !text.trim()) return res.status(400).json({ error: 'text required' });
    const convo = await requireParticipant(id, me);
    if (!convo) return res.status(404).json({ error: 'Conversation not found' });
    const recipient = convo.participants.find(p => String(p) !== String(me));
    const msg = await Message.create({ conversation: id, from: me, to: recipient, text: text.trim() });
    convo.lastMessageAt = msg.sentAt;
    await convo.save();
    res.status(201).json(msg);
  } catch (e) { next(e); }
};
