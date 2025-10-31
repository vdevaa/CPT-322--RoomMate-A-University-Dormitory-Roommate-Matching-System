// MOCK PROFILES WERE GENERATED USING CHATGPT

// SAMPLE DATA FOR FRONT END IMPLEMENTATION OF SWIPING AND MATCHING
export const mockCurrentUserId = 'current_user';

export const mockProfiles = [
  {
    id: 'p1',
    userId: 'user1',
    name: 'Kirin',
    hall: 'Streit Hall',
    room: '229',
    year: 'Freshman',
    bio: 'Hey, I\'m Kirin. Looking for a chill roommate at Streit Hall.',
    sleepSchedule: 'Late',
    cleanliness: 'Tidy',
    studyHabits: 'Quiet',
    hobbies: ['Valorant', 'D&D', 'Gym'],
    preferences: {
      wantsQuietHours: true,
      smokingOk: false,
      guestsOk: true,
    },
  },
  {
    id: 'p2',
    userId: 'user2',
    name: 'Ben',
    hall: 'Streit Hall',
    room: '227',
    year: 'Sophomore',
    bio: 'Music lover and coder. Looking for someone who respects quiet hours.',
    sleepSchedule: 'Normal',
    cleanliness: 'Average',
    studyHabits: 'Music',
    hobbies: ['Guitar', 'Movies', 'Coding'],
    preferences: {
      wantsQuietHours: true,
      smokingOk: false,
      guestsOk: true,
    },
  },
  {
    id: 'p3',
    userId: 'user3',
    name: 'Alexander',
    hall: 'Streit Hall',
    room: '225',
    year: 'Junior',
    bio: 'Early riser and organized. Love basketball and reading.',
    sleepSchedule: 'Early',
    cleanliness: 'Tidy',
    studyHabits: 'Group',
    hobbies: ['Basketball', 'Reading', 'Chess'],
    preferences: {
      wantsQuietHours: false,
      smokingOk: false,
      guestsOk: true,
    },
  },
  {
    id: 'p4',
    userId: 'user4',
    name: 'Ian',
    hall: 'Streit Hall',
    room: '223',
    year: 'Sophomore',
    bio: 'Car enthusiast and coder. Flexible with schedules.',
    sleepSchedule: 'Late',
    cleanliness: 'Messy',
    studyHabits: 'Music',
    hobbies: ['Cars', 'Coding', 'Gym'],
    preferences: {
      wantsQuietHours: true,
      smokingOk: true,
      guestsOk: false,
    },
  },
  {
    id: 'p5',
    userId: 'user5',
    name: 'Payton',
    hall: 'Streit Hall',
    room: '219',
    year: 'Freshman',
    bio: 'Artist and movie buff. Looking for a creative roommate.',
    sleepSchedule: 'Normal',
    cleanliness: 'Average',
    studyHabits: 'Quiet',
    hobbies: ['Art', 'Movies', 'Running'],
    preferences: {
      wantsQuietHours: true,
      smokingOk: false,
      guestsOk: true,
    },
  },
  {
    id: 'p6',
    userId: 'user6',
    name: 'Bella',
    hall: 'Streit Hall',
    room: '217',
    year: 'Sophomore',
    bio: 'Yoga enthusiast and photographer. Prefer quiet, clean space.',
    sleepSchedule: 'Early',
    cleanliness: 'Tidy',
    studyHabits: 'Quiet',
    hobbies: ['Yoga', 'Reading', 'Photography'],
    preferences: {
      wantsQuietHours: true,
      smokingOk: false,
      guestsOk: true,
    },
  },
];

// Track which profiles the current user has swiped on
export const swipeHistory = {
  liked: [], // profiles the current user swiped right on
  passed: [], // profiles the current user swiped left on
};

// Track matches (both users swiped right on each other)
export const matches = [];

export function addSwipe(profileId, direction) {
  if (direction === 'right') {
    if (!swipeHistory.liked.includes(profileId)) {
      swipeHistory.liked.push(profileId);
      // TODO FOR LONDON: we can add a check to see if users are matched here in the beackend
    }
  } else {
    if (!swipeHistory.passed.includes(profileId)) {
      swipeHistory.passed.push(profileId);
    }
  }
}

export function isMatched(profileId) {
  return matches.includes(profileId);
}

