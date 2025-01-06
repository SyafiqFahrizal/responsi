// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAL4WTQWw9kShq46AeL5hPut4JWQmfMRTM",
    authDomain: "goalsaver-6fbd8.firebaseapp.com",
    projectId: "goalsaver-6fbd8",
    storageBucket: "goalsaver-6fbd8.firebasestorage.app",
    messagingSenderId: "177323609967",
    appId: "1:177323609967:web:602b8223c03a69f97ce29a",
    measurementId: "G-STYW5DH4ST"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
