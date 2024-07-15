// src/config/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCRkGfV6uc3YuO3YATLW9xyWL-yoFv3vBs",
  authDomain: "mama-baby-d972b.firebaseapp.com",
  projectId: "mama-baby-d972b",
  storageBucket: "mama-baby-d972b.appspot.com",
  messagingSenderId: "967858980220",
  appId: "1:967858980220:web:1d9873a1fae9639853d0f9",
  measurementId: "G-5Z47YQF5RF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
export { signInWithPopup };
