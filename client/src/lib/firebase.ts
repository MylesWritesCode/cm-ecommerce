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
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

const env = process.env;
const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseStorage = getStorage(app);
const firebaseFirestore = getFirestore(app); // Probably not using this
const analytics = getAnalytics(app);

export { firebaseStorage, firebaseFirestore, };