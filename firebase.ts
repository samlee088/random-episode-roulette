import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCw3kyBHoLbjvJ4ioJtGrvRFj2oQY5hBsA",
  authDomain: "random-episode-roulette.firebaseapp.com",
  projectId: "random-episode-roulette",
  storageBucket: "random-episode-roulette.appspot.com",
  messagingSenderId: "32738286624",
  appId: "1:32738286624:web:1ee5764b8c2fe95c8ab045",
  measurementId: "G-24ZRN7XH6C",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
