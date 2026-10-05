# XpenseEz

## What is XpenseEz?
XpenseEz is a slick, scalable, and intuitive finance management application built for Android. It allows users to track their daily income and expenses seamlessly. With a focus on data visualization and dataset generation, XpenseEz helps users understand their spending habits through interactive charts while securely logging analytical data for deeper insights.

## How to Download it on Mobile from GitHub
*Note: Once the final APK is compiled via EAS (Expo Application Services), it will be available in the GitHub Releases section of this repository.*

To test and run it immediately on your mobile device:
1. Download the **Expo Go** app from the Google Play Store on your Android device.
2. Clone this repository to your computer:
   ```bash
   git clone https://github.com/nnfuad/XpenseEz.git
   cd XpenseEz
   ```
3. Install dependencies and start the development server:
   ```bash
   npm install
   npm run start
   ```
4. Scan the QR code displayed in your terminal using the Expo Go app.

## Architecture
- **Frontend Framework**: React Native (via Expo) - Ensures a highly customizable UI and optimized APK generation.
- **Language**: TypeScript - For type safety and robust code structure.
- **State Management**: Zustand - Lightweight, scalable state management for handling transactions.
- **Backend & Analytics**: Firebase Firestore & Analytics - Scalable NoSQL database paired with event tracking to generate datasets for user behavior analysis.
- **Data Visualization**: `react-native-chart-kit` - Provides engaging Pie and Line charts to visualize financial data.
- **Navigation**: React Navigation (Bottom Tabs) - For smooth and intuitive screen transitions.

## Completed Jobs (Status Updates)
- **[2026-10-05]** - Scaffolding and Core Features: Project initialized. Setup React Native Expo architecture, Zustand state management, React Navigation, Firebase Analytics config, and interactive Dashboard Charts.

---
**Author**: Nur Nafis Fuad, Electrical and Computer Engineering Student
