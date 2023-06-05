import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB3c-l4SnUHNElToLFyNb6htxNkGzpRVWk",
  authDomain: "codinguniverse-20c51.firebaseapp.com",
  projectId: "codinguniverse-20c51",
  storageBucket: "codinguniverse-20c51.appspot.com",
  messagingSenderId: "792852567245",
  appId: "1:792852567245:web:5901c7b2fc9bbe1f294584"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();