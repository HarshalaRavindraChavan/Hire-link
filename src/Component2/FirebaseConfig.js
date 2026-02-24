import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const firebaseConfig = {
//   apiKey: "AIzaSyCWa1oldySEohxtyxp2NY4Cn4K0w91X7vg",
//   authDomain: "hirelink-notification.firebaseapp.com",
//   projectId: "hirelink-notification",
//   storageBucket: "hirelink-notification.firebasestorage.app",
//   messagingSenderId: "167301932014",
//   appId: "1:167301932014:web:4fa07ca1aa262ca59ba4ff",
//   measurementId: "G-M1V6EBSCVR"
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByxt58o3I6hlbXoTfQyBm2L7v5Iwz33Vg",
  authDomain: "web-app-android-3a596.firebaseapp.com",
  projectId: "web-app-android-3a596",
  storageBucket: "web-app-android-3a596.firebasestorage.app",
  messagingSenderId: "407808190257",
  appId: "1:407808190257:web:818fa1a95cf81215e57210"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging and export it
export const messaging = getMessaging(app);
export { getToken, onMessage };