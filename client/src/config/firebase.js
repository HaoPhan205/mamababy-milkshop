// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyvPjMuVqUGYx17FmxX5xxXV4TLIyko0I",
  authDomain: "cursus-add39.firebaseapp.com",
  projectId: "cursus-add39",
  storageBucket: "cursus-add39.appspot.com",
  messagingSenderId: "721147504882",
  appId: "1:721147504882:web:a7c973d1e0150cd852086b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { signInWithPopup };

