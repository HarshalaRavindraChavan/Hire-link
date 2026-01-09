import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCWa1oldySEohxtyxp2NY4Cn4K0w91X7vg",
  authDomain: "hirelink-notification.firebaseapp.com",
  projectId: "hirelink-notification",
  storageBucket: "hirelink-notification.firebasestorage.app",
  messagingSenderId: "167301932014",
  appId: "1:167301932014:web:4fa07ca1aa262ca59ba4ff",
  measurementId: "G-M1V6EBSCVR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging and export it
export const messaging = getMessaging(app);
export { getToken, onMessage };