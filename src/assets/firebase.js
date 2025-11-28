// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAP-8qFpcdFGZNfcWCbEgXRKKaDnr8rGCQ",
  authDomain: "wokwi-firebase-980db.firebaseapp.com",
  projectId: "wokwi-firebase-980db",
  storageBucket: "wokwi-firebase-980db.firebasestorage.app",
  messagingSenderId: "597534197036",
  appId: "1:597534197036:web:23431c035bd323800a5889",
  measurementId: "G-H8G2T1XK8N"
};

// Init
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Google provider
export const googleProvider = new GoogleAuthProvider();
