import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBkm4KmCdpDINq4jxNLT9r1zUvm1m0SHwA",
  authDomain: "xpenseez.firebaseapp.com",
  projectId: "xpenseez",
  storageBucket: "xpenseez.firebasestorage.app",
  messagingSenderId: "621086149431",
  appId: "1:621086149431:web:cd6f5980533f867e70e8b2",
  measurementId: "G-7TMXW0ZCJM"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
