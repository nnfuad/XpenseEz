# XpenseEz

## What is XpenseEz?
XpenseEz is a slick, scalable, and intuitive finance management application built for Android. It allows users to track their daily income and expenses seamlessly. With a focus on data visualization and dataset generation, XpenseEz helps users understand their spending habits through interactive charts while securely logging analytical data for deeper insights.

## How to Download and Install on Mobile
You can install XpenseEz directly on your Android device without needing to build it yourself!

1. Open your mobile web browser and navigate to this repository's [**Releases**](https://github.com/nnfuad/XpenseEz/releases) page.
2. Click on the latest release.
3. Under the **Assets** section, tap on `app-release.apk` to download it.
4. Once downloaded, open the file to install it. *(Note: Your phone might ask for permission to "Install unknown apps" from your browser. Simply go to settings and toggle 'Allow from this source'.)*

### For Developers (Run Locally)
If you want to edit or test the app yourself:
1. Clone this repository:
   ```bash
   git clone https://github.com/nnfuad/XpenseEz.git
   cd XpenseEz
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server and test using the Expo Go app:
   ```bash
   npm run start
   ```

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
