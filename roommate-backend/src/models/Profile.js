import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  hall: { type: String, default: 'Streit Hall' },
  room: { type: String, default: '' },
  year: { type: String, enum: ['Freshman','Sophomore','Junior','Senior','Grad'], default: 'Freshman' },
  bio: { type: String, default: '' },
  sleepSchedule: { type: String, enum: ['Early','Normal','Late'], default: 'Normal' },
  cleanliness: { type: String, enum: ['Tidy','Average','Messy'], default: 'Average' },
  studyHabits: { type: String, enum: ['Quiet','Music','Group'], default: 'Quiet' },
  hobbies: [{ type: String }],
  preferences: {
    wantsQuietHours: { type: Boolean, default: true },
    smokingOk: { type: Boolean, default: false },
    guestsOk: { type: Boolean, default: true },
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Profile', ProfileSchema);
