import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpDV-efWcV0NrwIqPpuLw6ho1xT8x03Ak",
  authDomain: "schrodinermission.firebaseapp.com",
  projectId: "schrodinermission",
  storageBucket: "schrodinermission.firebasestorage.app",
  messagingSenderId: "676104232272",
  appId: "1:676104232272:web:dc27be1f70bf3afcfae055",
  measurementId: "G-NM6FMD6RZ8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);