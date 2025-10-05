import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

export const getMe = async (req, res) => {
  const user = await User.findById(req.user.sub).lean();
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ id: user._id, email: user.email, name: user.name, settings: user.settings });
};

export const validateUpdateMe = [
  body('name').optional().isLength({ min: 2 }),
  body('settings.notifications').optional().isBoolean(),
  body('settings.quietHoursStart').optional().isString(),
  body('settings.quietHoursEnd').optional().isString(),
];

export const updateMe = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const updates = {};
  if (req.body.name) updates.name = req.body.name;
  if (req.body.settings) updates.settings = req.body.settings;

  const user = await User.findByIdAndUpdate(req.user.sub, updates, { new: true });
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ id: user._id, email: user.email, name: user.name, settings: user.settings });
};
