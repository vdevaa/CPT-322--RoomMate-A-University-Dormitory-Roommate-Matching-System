// Mock current user profile data
// In real app, this would be fetched from backend/API

export const currentUserProfile = {
  name: 'John Doe',
  age: '20',
  major: 'Computer Science',
  year: 'Sophomore',
  about: 'I love coding, gaming, and meeting new people. Looking for a roommate who is respectful and clean.',
  hall: 'Streit Hall',
  room: '201',
  sleepSchedule: 'Normal',
  cleanliness: 'Tidy',
  studyHabits: 'Quiet',
  hobbies: ['Coding', 'Gaming', 'Basketball'],
  preferences: {
    wantsQuietHours: true,
    smokingOk: false,
    guestsOk: true,
  },
};

export function updateCurrentUserProfile(updates) {
  Object.assign(currentUserProfile, updates);
}

