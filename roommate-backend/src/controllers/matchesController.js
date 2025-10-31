import Profile from '../models/Profile.js';
import Conversation from '../models/Conversation.js';

export const likeUser = async (req, res) => {
  try {
    const targetUserId = req.params.userId;
    const me = await Profile.findOne({ user: req.user.sub });
    const target = await Profile.findOne({ user: targetUserId });
    if (!me || !target) return res.status(404).json({ error: 'Profile not found' });

    if (!me.likes.includes(target.user)) me.likes.push(target.user);
    if (!target.likedBy.includes(me.user)) target.likedBy.push(me.user);

    let matched = false;
    if (target.likes.includes(me.user) && !me.matches.includes(target.user)) {
      me.matches.push(target.user);
      target.matches.push(me.user);
      matched = true;

      const pair = [String(me.user), String(target.user)].sort();
      let convo = await Conversation.findOne({ participants: { $all: pair, $size: 2 } });
      if (!convo) {
        convo = await Conversation.create({
          participants: pair,
          activeFor: pair,
          lastMessageAt: new Date()
        });
      } else {
        const missing = pair.filter(id => !convo.activeFor.map(String).includes(id));
        if (missing.length) {
          convo.activeFor = [...new Set([...convo.activeFor.map(String), ...missing])];
          await convo.save();
        }
      }
    }

    await me.save();
    await target.save();
    res.json({ ok: true, matched });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
