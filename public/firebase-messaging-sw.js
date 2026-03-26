importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js",
);

import logo from "../src/Component2/logo/hirelink.png";

firebase.initializeApp({
  // apiKey: "AIzaSyCWa1oldySEohxtyxp2NY4Cn4K0w91X7vg",
  // authDomain: "hirelink-notification.firebaseapp.com",
  // projectId: "hirelink-notification",
  // messagingSenderId: "167301932014",
  // appId: "1:167301932014:web:4fa07ca1aa262ca59ba4ff",

  apiKey: "AIzaSyByxt58o3I6hlbXoTfQyBm2L7v5Iwz33Vg",
  authDomain: "web-app-android-3a596.firebaseapp.com",
  projectId: "web-app-android-3a596",
  // storageBucket: "web-app-android-3a596.firebasestorage.app",
  messagingSenderId: "407808190257",
  appId: "1:407808190257:web:818fa1a95cf81215e57210",
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(clients.openWindow("/jobs"));
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message received:", payload);

  const title = payload?.notification?.title || "Hirelink Notification";
  const options = {
    body: payload?.notification?.body || "",
    icon: logo,
    badge: logo,
  };

  self.registration.showNotification(title, options);
});
