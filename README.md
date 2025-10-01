# RoomMate - University Dormitory Roommate Matching System

A React Native mobile application designed to help university students find compatible roommates for dormitory living.

## Group Project - CPT 322

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Expo CLI** - Install globally with: `npm install -g expo-cli`
- **Expo Go app** on your mobile device:
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/runWaterCols/CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System.git
cd CPT-322--RoomMate-A-University-Dormitory-Roommate-Matching-System
```

### 2. Navigate to the App Directory

```bash
cd roommate-app
```

### 3. Install Dependencies

```bash
npm install
```

Or if you're using yarn:

```bash
yarn install
```

## Running the App

### Start the Development Server

```bash
npm start
```

Or with Expo CLI:

```bash
expo start
```

This will open the Expo DevTools in your browser and display a QR code.

### Run on Your Device

1. Open the **Expo Go** app on your mobile device
2. Scan the QR code displayed in your terminal or browser
3. The app will load on your device

### Run on Emulator/Simulator

- **iOS Simulator** (Mac only): Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal

## Project Structure

```
roommate-app/
├── App.js                  # Main app component
├── index.js               # App entry point
├── package.json           # Dependencies and scripts
├── app.json              # Expo configuration
├── assets/               # Images and static files
└── src/
    └── screens/          # App screens
        ├── WelcomeScreen.js
        ├── ProfileScreen.js
        └── PreferencesScreen.js
```

## Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform
- **React Navigation** - Navigation library

## Troubleshooting

### Common Issues

1. **"Expo CLI not found"**
   - Run: `npm install -g expo-cli`

2. **"Module not found" errors**
   - Delete `node_modules` folder and `package-lock.json`
   - Run: `npm install` again

3. **Port already in use**
   - The default port (19000) is in use
   - Kill the process or use: `expo start --port 19001`

## Contributing

1. Create a new branch for your feature: `git checkout -b feature-name`
2. Make your changes and commit: `git commit -m "Add feature"`
3. Push to your branch: `git push origin feature-name`
4. Create a Pull Request

## Team Members

- Vijay Deva, Logan Straight, Will Colson, London Zaineb

## License

This project is for educational purposes as part of CPT-322 course work.
