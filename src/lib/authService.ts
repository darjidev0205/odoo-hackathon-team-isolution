// src/lib/authService.ts
// Handles: Login, Logout, Register, Get current user

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { auth } from "./firebase";

// ── LOGIN ──────────────────────────────────────────────────────
export async function loginUser(email: string, password: string): Promise<User> {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
}

// ── REGISTER (create new account) ─────────────────────────────
export async function registerUser(email: string, password: string): Promise<User> {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  return result.user;
}

// ── LOGOUT ────────────────────────────────────────────────────
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

// ── WATCH AUTH STATE (use in components) ──────────────────────
// Calls callback with user object when logged in, null when logged out
export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

// ── GET CURRENT USER ──────────────────────────────────────────
export function getCurrentUser(): User | null {
  return auth.currentUser;
}
