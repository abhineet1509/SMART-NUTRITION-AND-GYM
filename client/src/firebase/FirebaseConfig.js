// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAmtPdeDoCGLkDapLULQqzdPol85BN4Tjg",
  authDomain: "fitwork-c3614.firebaseapp.com",
  projectId: "fitwork-c3614",
  storageBucket: "fitwork-c3614.firebasestorage.app",
  messagingSenderId: "430100320158",
  appId: "1:430100320158:web:0f654628b8be9ba27b108f",
  measurementId: "G-EM85GQNSHD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;