// src/lib/firebase.ts
// ─────────────────────────────────────────────────────────────
// STEP 1: Replace the values below with YOUR Firebase project
//         config. You get these from the Firebase Console.
//         (See README_FIREBASE.md for exact steps)
// ─────────────────────────────────────────────────────────────

import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDg2ZmdAXUm1GIyqu3R3g09n0mjM0za1tE",
  authDomain: "odoo-hackathon-50dec.firebaseapp.com",
  projectId: "odoo-hackathon-50dec",
  storageBucket: "odoo-hackathon-50dec.firebasestorage.app",
  messagingSenderId: "322591866415",
  appId: "1:322591866415:web:25090c62eb2edca2e190da",
  measurementId: "G-CC085G7SK1"
};

// Prevent re-initializing on hot reload in Next.js dev mode
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db   = getFirestore(app);  // Firestore database
export const auth = getAuth(app);       // Authentication

export default app;
