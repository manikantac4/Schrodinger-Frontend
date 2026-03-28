// service.js

import axios from "axios";
import { getAuth } from "firebase/auth";

// Create axios instance
const API = axios.create({
  baseURL: "https://sentinel-6vs3.onrender.com/api", // your backend
  timeout: 10000,
});

// 🔥 INTERCEPTOR (runs before every request)
API.interceptors.request.use(
  async (config) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const token = await user.getIdToken(); // 🔑 Firebase JWT
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error("Token fetch error:", error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

export default API;