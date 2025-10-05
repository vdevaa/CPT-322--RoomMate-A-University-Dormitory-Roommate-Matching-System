import User from '../models/User.js';
import Profile from '../models/Profile.js';
import { hashPassword, comparePassword, signToken } from '../utils/auth.js';
import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('name').isLength({ min: 2 })
];

export const validateLogin = [
  body('email').isEmail(),
  body('password').isLength({ min: 1 })
];

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password, name } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ error: 'Email already in use' });
  const passwordHash = await hashPassword(password);
  const user = await User.create({ email, passwordHash, name });
  await Profile.create({ user: user._id, bio: `Hi, I'm ${name}!` });
  const token = signToken(user);
  res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = signToken(user);
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
};
