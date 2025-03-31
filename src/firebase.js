import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCpZemcJqENzz3IQb3V1Uvu9Ps9b20JCnE",
  authDomain: "sweet-dreams-98c96.firebaseapp.com",
  projectId: "sweet-dreams-98c96",
  storageBucket: "sweet-dreams-98c96.firebasestorage.app",
  messagingSenderId: "530979246623",
  appId: "1:530979246623:web:adb6cc4f54a0e7023e3b2a",
  measurementId: "G-DN1NE1KGS0",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
