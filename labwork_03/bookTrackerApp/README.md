Setup

1. Clone the repo

git clone https://github.com/KedarKandel/building-deploying_cross_platfrom_apps/tree/main/labwork_03/bookTrackerApp
cd book-tracker-app


2. Install dependencies

npm install
# or
yarn install


3. Configure Firebase

- Create a Firebase project, enable Email/Password Auth and Cloud Firestore.

- Add your Firebase credentials to a .env file (see firebase/config.ts for usage).
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



4. Run the app

- npx expo start


5. Open on Android/iOS simulator, Expo Go, or web browser.

#  Features

- Welcome screen → Login/Register → Home

- Firebase authentication (email/password)

- Add, view, and delete books listed

- Book details page

- User profile and contact page

Project Structure
app/
 ├─ index.tsx 
 └─ contact.tsx      # Home / Welcome page
 ├─ login.tsx
 ├─ register.tsx
 ├─ add-book.tsx
 ├─ book/[id].tsx
 ├─ profile.tsx
 └─ profile.tsx
 
components/
 └─ BookItem.tsx
 └─ Loading.tsx
context/
 └─ AuthContext.tsx
firebase/
 └─ config.ts
 ........