import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';
import Profile from '../src/models/Profile.js';
import { hashPassword } from '../src/utils/auth.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://root:rootpass@localhost:27017/roommate_db?authSource=admin';

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

  const createdUsers = [];
  const createdProfiles = [];

  for (const p of people) {
    const pass = 'Password123!';
    const user = await User.create({
      email: p.email,
      name: p.name,
      passwordHash: await hashPassword(pass),
      settings: { notifications: true, quietHoursStart: '22:00', quietHoursEnd: '08:00' }
    });
    const profile = await Profile.create({
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
    createdUsers.push(user);
    createdProfiles.push(profile);
    console.log(`Created ${p.name} / ${p.email} (password: Password123!)`);
  }

  // Set up some mutual likes for demo purposes
  // Find users and profiles by index (order matches people array)
  const kirinUser = createdUsers[0]; // Kirin is first
  const kirinProfile = createdProfiles[0];
  
  const benUser = createdUsers[1]; // Ben is second
  const benProfile = createdProfiles[1];
  
  const alexanderUser = createdUsers[2]; // Alexander is third
  const alexanderProfile = createdProfiles[2];
  
  const ianUser = createdUsers[3]; // Ian is fourth
  const ianProfile = createdProfiles[3];

  // Make Ben, Alexander, and Ian like Kirin (so when Kirin likes them back, they'll match)
  if (kirinProfile && benProfile) {
    if (!benProfile.likes.includes(kirinUser._id)) {
      benProfile.likes.push(kirinUser._id);
    }
    if (!kirinProfile.likedBy.includes(benUser._id)) {
      kirinProfile.likedBy.push(benUser._id);
    }
    await benProfile.save();
    console.log('Set Ben to like Kirin');
  }

  if (kirinProfile && alexanderProfile) {
    if (!alexanderProfile.likes.includes(kirinUser._id)) {
      alexanderProfile.likes.push(kirinUser._id);
    }
    if (!kirinProfile.likedBy.includes(alexanderUser._id)) {
      kirinProfile.likedBy.push(alexanderUser._id);
    }
    await alexanderProfile.save();
    console.log('Set Alexander to like Kirin');
  }

  if (kirinProfile && ianProfile) {
    if (!ianProfile.likes.includes(kirinUser._id)) {
      ianProfile.likes.push(kirinUser._id);
    }
    if (!kirinProfile.likedBy.includes(ianUser._id)) {
      kirinProfile.likedBy.push(ianUser._id);
    }
    await ianProfile.save();
    console.log('Set Ian to like Kirin');
  }

  // Save Kirin's profile
  if (kirinProfile) {
    await kirinProfile.save();
  }

  console.log('Seed complete.');
  await mongoose.disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
