import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJf0bCWPFKM92dz6ZGtYkg0wNqjKA2y1A",
  authDomain: "groupproject1t.firebaseapp.com",
  projectId: "groupproject1t",
  storageBucket: "groupproject1t.appspot.com",
  messagingSenderId: "599477433634",
  appId: "1:599477433634:web:0e9ec24882d0d12fc8a17b",
  measurementId: "G-TYKPL2N0ZW"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();

export {
  db
}