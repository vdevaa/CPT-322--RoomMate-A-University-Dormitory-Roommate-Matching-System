import Conversation from '../models/Conversation.js';

export const myConversations = async (req, res, next) => {
  try {
    const me = req.user.sub || req.user.id || req.user._id || req.user;
    const convos = await Conversation.find({ participants: me, activeFor: me })
      .sort({ lastMessageAt: -1 })
      .populate('participants', 'email name')
      .lean();
    const out = convos.map(c => ({
      id: c._id,
      participants: c.participants,
      otherUser: c.participants.find(p => String(p._id) !== String(me)),
      lastMessageAt: c.lastMessageAt
    }));
    res.json(out);
  } catch (e) { next(e); }
};

export const leaveConversation = async (req, res, next) => {
  try {
    const me = req.user.sub || req.user.id || req.user._id || req.user;
    const { id } = req.params;
    const convo = await Conversation.findById(id);
    if (!convo) return res.status(404).json({ error: 'Conversation not found' });
    if (!convo.participants.map(String).includes(String(me))) return res.status(403).json({ error: 'Not a participant' });
    convo.activeFor = convo.activeFor.filter(u => String(u) !== String(me));
    await convo.save();
    res.json({ ok: true });
  } catch (e) { next(e); }
};
