import { initializeApp, getApps } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as firebaseAuth from 'firebase/auth';
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@env';

// Firebase config
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Cache Auth instance globally
let _auth: ReturnType<typeof initializeAuth> | null = null;

export function getFirebaseAuth() {
  if (!_auth) {
    _auth = initializeAuth(app, {
      persistence: reactNativePersistence(AsyncStorage),
    });
  }
  return _auth;
}

// Firestore instance
export const db = getFirestore(app);
export { app };




// const firebaseConfig = {
//   apiKey: "AIzaSyDI6GgROYWKZ_aZiYcyKTaQHE8oH53XAWM",
//   authDomain: "booktrackerapp-a2d58.firebaseapp.com",
//   projectId: "booktrackerapp-a2d58",
//   storageBucket: "booktrackerapp-a2d58.firebasestorage.app",
//   messagingSenderId: "305384505173",
//   appId: "1:305384505173:web:688edd008fcbdaf70af9dc",
//   measurementId: "G-ER2CE3RQ2Y"
// };





