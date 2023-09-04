// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP3ZRnOSN1-EF5gzD5qC6-8t1oOLM97s4",
  authDomain: "track-flaw.firebaseapp.com",
  projectId: "track-flaw",
  storageBucket: "track-flaw.appspot.com",
  messagingSenderId: "934548577750",
  appId: "1:934548577750:web:b62f75c2880efaf8479877"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)