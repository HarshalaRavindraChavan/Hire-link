importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCWa1oldySEohxtyxp2NY4Cn4K0w91X7vg",
  authDomain: "hirelink-notification.firebaseapp.com",
  projectId: "hirelink-notification",
  messagingSenderId: "167301932014",
  appId: "1:167301932014:web:4fa07ca1aa262ca59ba4ff",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("📩 Background message received:", payload);

  const title = payload?.notification?.title || "Hirelink Notification";
  const options = {
    body: payload?.notification?.body || "",
    icon: "/logo192.png",
    badge: "/logo192.png",
  };

  self.registration.showNotification(title, options);
});
