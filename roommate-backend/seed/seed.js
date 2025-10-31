import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Profile from '../src/models/Profile.js';
import { hashPassword } from '../src/utils/auth.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/roommate_db';

const people = [
  { name: 'Kirin', email: 'kirin@example.com', hall: 'Streit Hall', room: '229',
    prefs: { wantsQuietHours: true, smokingOk: false, guestsOk: true },
    traits: { sleep: 'Late', clean: 'Tidy', study: 'Quiet' },
    hobbies: ['Valorant','D&D','Gym'] },
  { name: 'Ben', email: 'ben@example.com', hall: 'Streit Hall', room: '227',
    prefs: { wantsQuietHours: true, smokingOk: false, guestsOk: true },
    traits: { sleep: 'Normal', clean: 'Average', study: 'Music' },
    hobbies: ['Guitar','Movies','Coding'] },
  { name: 'Alexander', email: 'alexander@example.com', hall: 'Streit Hall', room: '225',
    prefs: { wantsQuietHours: false, smokingOk: false, guestsOk: true },
    traits: { sleep: 'Early', clean: 'Tidy', study: 'Group' },
    hobbies: ['Basketball','Reading','Chess'] },
  { name: 'Ian', email: 'ian@example.com', hall: 'Streit Hall', room: '223',
    prefs: { wantsQuietHours: true, smokingOk: true, guestsOk: false },
    traits: { sleep: 'Late', clean: 'Messy', study: 'Music' },
    hobbies: ['Cars','Coding','Gym'] },
  { name: 'Payton', email: 'payton@example.com', hall: 'Streit Hall', room: '219',
    prefs: { wantsQuietHours: true, smokingOk: false, guestsOk: true },
    traits: { sleep: 'Normal', clean: 'Average', study: 'Quiet' },
    hobbies: ['Art','Movies','Running'] },
  { name: 'Bella', email: 'bella@example.com', hall: 'Streit Hall', room: '217',
    prefs: { wantsQuietHours: true, smokingOk: false, guestsOk: true },
    traits: { sleep: 'Early', clean: 'Tidy', study: 'Quiet' },
    hobbies: ['Yoga','Reading','Photography'] }
];

async function main() {
  await mongoose.connect(MONGODB_URI);
  console.log('Seeding DB at', MONGODB_URI);

  await User.deleteMany({});
  await Profile.deleteMany({});

  for (const p of people) {
    const pass = 'Password123!';
    const user = await User.create({
      email: p.email,
      name: p.name,
      passwordHash: await hashPassword(pass),
      settings: { notifications: true, quietHoursStart: '22:00', quietHoursEnd: '08:00' }
    });
    await Profile.create({
      user: user._id,
      hall: p.hall,
      room: p.room,
      year: 'Freshman',
      bio: `Hey, I'm ${p.name}. Looking for a chill roommate at ${p.hall}.`,
      sleepSchedule: p.traits.sleep,
      cleanliness: p.traits.clean,
      studyHabits: p.traits.study,
      hobbies: p.hobbies,
      preferences: p.prefs
    });
    console.log(`Created ${p.name} / ${p.email} (password: Password123!)`);
  }

  console.log('Seed complete.');
  await mongoose.disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
