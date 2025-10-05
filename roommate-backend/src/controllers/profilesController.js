import Profile from '../models/Profile.js';
import { body, validationResult } from 'express-validator';

export const validateUpdateProfile = [
  body('hall').optional().isString(),
  body('room').optional().isString(),
  body('year').optional().isString(),
  body('bio').optional().isString(),
  body('sleepSchedule').optional().isString(),
  body('cleanliness').optional().isString(),
  body('studyHabits').optional().isString(),
  body('hobbies').optional().isArray(),
  body('preferences').optional().isObject(),
];

export const getProfile = async (req, res) => {
  const p = await Profile.findOne({ user: req.params.id }).populate('user','name email').lean();
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
};

export const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const allowed = ['hall','room','year','bio','sleepSchedule','cleanliness','studyHabits','hobbies','preferences'];
  const updates = {};
  for (const k of allowed) if (k in req.body) updates[k] = req.body[k];
  updates.updatedAt = new Date();

  const p = await Profile.findOneAndUpdate({ user: req.params.id }, updates, { new: true, upsert: true });
  res.json(p);
};
