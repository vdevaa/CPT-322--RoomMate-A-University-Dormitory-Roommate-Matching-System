import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import profileRoutes from './routes/profiles.js';
import matchRoutes from './routes/matches.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/matches', matchRoutes);

const PORT = process.env.PORT || 8438;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/roommate_db';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`API listening on :${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
