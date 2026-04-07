import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBdsQSwVhmOm9BI-H0svP3UxLIhJYjQyyc",
  authDomain: "sentinel-1f5e7.firebaseapp.com",
  projectId: "sentinel-1f5e7",
  storageBucket: "sentinel-1f5e7.firebasestorage.app",
  messagingSenderId: "660774594212",
  appId: "1:660774594212:web:df4eae810e01146f206831",
  measurementId: "G-JQPPBBQZF8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);