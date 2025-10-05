import Profile from '../models/Profile.js';

function score(a, b) {
  let s = 0;
  if (a.sleepSchedule === b.sleepSchedule) s += 2;
  if (a.cleanliness === b.cleanliness) s += 2;
  if (a.studyHabits === b.studyHabits) s += 1;
  const setA = new Set(a.hobbies || []);
  const shared = (b.hobbies || []).filter(h => setA.has(h)).length;
  s += Math.min(shared, 5); // cap to avoid runaway
  if (a.preferences?.wantsQuietHours === b.preferences?.wantsQuietHours) s += 1;
  if (a.preferences?.smokingOk === b.preferences?.smokingOk) s += 1;
  if (a.preferences?.guestsOk === b.preferences?.guestsOk) s += 1;
  return s;
}

export const recommendations = async (req, res) => {
  const me = await Profile.findOne({ user: req.user.sub }).lean();
  if (!me) return res.status(400).json({ error: 'Create your profile first' });

  const others = await Profile.find({ user: { $ne: me.user } }).lean();
  const ranked = others
    .map(p => ({ profile: p, score: score(me, p) }))
    .sort((a,b) => b.score - a.score)
    .slice(0, 10);

  res.json(ranked);
};

export const likeUser = async (req, res) => {
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
  }

  await me.save();
  await target.save();
  res.json({ ok: true, matched });
};
