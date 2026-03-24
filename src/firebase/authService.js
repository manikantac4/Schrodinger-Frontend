import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./config";

const googleProvider = new GoogleAuthProvider();

// 🔥 Email Login
export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// 🔥 Signup
export const signupUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// 🔥 Google Login
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