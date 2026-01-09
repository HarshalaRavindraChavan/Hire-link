



import React, { useEffect } from "react";
import "../Component2/css/Notification.css";
import { getToken } from "firebase/messaging";
import { messaging } from "./FirebaseConfig";

export default function NotificationPage() {
  const requestPermission = async () => {
    console.log("1️⃣ Starting requestPermission...");

    // try {
    //   // Step 1: Ask permission
    //   const permission = await Notification.requestPermission();
    //   console.log("2️⃣ Permission status:", permission);

    //   if (permission !== "granted") {
    //     console.warn("🚫 Notification permission not granted");
    //     return;
    //   }

    //   // Step 2: Check service worker support
    //   if (!("serviceWorker" in navigator)) {
    //     console.error("❌ Service Worker not supported");
    //     return;
    //   }

    //   // Step 3: Register service worker
    //   const registration = await navigator.serviceWorker.register(
    //     "/firebase-messaging-sw.js"
    //   );

    //   console.log(
    //     "3️⃣ Service Worker registered:",
    //     registration.scope
    //   );

    //   // Step 4: Get FCM token
    //   const token = await getToken(messaging, {
    //     vapidKey:
    //       "BOA4JP6l1J_UvQ1VjBxc9SGlP-IulMYipKnb2EHuz6bvvKTwlf8-r9Y5T5Na1qc4plv2rUxrNs7U_ck8X5oElZc",
    //     serviceWorkerRegistration: registration,
    //   });

    //   if (token) {
    //     console.log("4️⃣ ✅ FCM Token:", token);
    //     // TODO: send token to CodeIgniter backend
    //   } else {
    //     console.warn("⚠️ Token not generated");
    //   }
    // } catch (error) {
    //   console.error("🔥 FCM Error:", error);
    // }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div className="notification-page">
      <h1>Hirelink Web Notifications</h1>
      <p>Push notification service active</p>
    </div>
  );
}
