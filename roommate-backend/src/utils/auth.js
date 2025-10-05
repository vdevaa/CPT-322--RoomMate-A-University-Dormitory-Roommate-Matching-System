import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = (password, hash) => bcrypt.compare(password, hash);

export const signToken = (user) => {
  const payload = { sub: user._id.toString(), email: user.email };
  const secret = process.env.JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  return jwt.verify(token, secret);
};
