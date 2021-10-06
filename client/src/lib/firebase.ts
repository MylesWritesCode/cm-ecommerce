/*
 * File: /src/lib/firebase.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Monday September 27th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Monday September 27th 2021 2:20:58 pm
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

console.log(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const DEBUG = process.env.NODE_ENV === 'development';

// Initialize Firebase
if (DEBUG) console.log("Initializing Firebase...");
const app = initializeApp(firebaseConfig);
if (DEBUG) console.log("...Firebase initialized!");

export const firebaseStorage = getStorage(app);
export const firebaseFirestore = getFirestore(app); // Probably not using this
// export const analytics = getAnalytics(app);

