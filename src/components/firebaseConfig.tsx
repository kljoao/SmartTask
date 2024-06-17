// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUX7ziRmsXn5XEs0yeK0Hz9WLMSazMEGs",
  authDomain: "smarttask-3625f.firebaseapp.com",
  projectId: "smarttask-3625f",
  storageBucket: "smarttask-3625f.appspot.com",
  messagingSenderId: "565863917997",
  appId: "1:565863917997:web:c5ce4b06f92dd7082d9924",
  measurementId: "G-ZV6MMNCCYQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };