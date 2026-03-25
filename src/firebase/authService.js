import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./config";

// 🔥 Google Provider Setup
const googleProvider = new GoogleAuthProvider();

// ✅ Force account selection every time
googleProvider.setCustomParameters({
  prompt: "select_account"
});

// 🔥 Email Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 🔥 Signup
export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// 🔥 Google Login (Account chooser enabled)
export const googleLogin = () => {
  return signInWithPopup(auth, googleProvider);
};

// 🔥 Logout
export const logoutUser = () => {
  return signOut(auth);
};

// 🔥 Session Listener
export const listenAuthState = (callback) => {
  return onAuthStateChanged(auth, callback);
};