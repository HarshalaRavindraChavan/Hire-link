import React, { useEffect, useState } from "react";
import "../Component2/css/Notification.css";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import { onMessage } from "firebase/messaging";
import { messaging } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load notifications from backend (DB)
  const loadNotifications = async (candidateId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}hirelink_apis/candidate/notifications/${candidateId}`
      );

      if (res.data.status) {
        setNotifications(res.data.data || []);
      }
    } catch (err) {
      console.error("Notification load error", err);
    }
  };

  // 🔹 Initial load
  useEffect(() => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));

    // 🔐 LOGIN CHECK
    if (!candidate) {
      navigate("/signin");
      return;
    }

    loadNotifications(candidate.can_id);
  }, [navigate]);

  // 🔔 REAL-TIME update (NO REFRESH)
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("🔥 Foreground FCM:", payload);

      const candidate = JSON.parse(localStorage.getItem("candidate"));

      if (
        candidate &&
        payload?.data?.candidate_id === String(candidate.can_id)
      ) {
        loadNotifications(candidate.can_id);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleClick = async (item) => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));
    if (!candidate) return;

    if (item.noti_is_read == 0) {
      await markAsRead(item.noti_id, candidate.can_id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.noti_id === item.noti_id ? { ...n, noti_is_read: 1 } : n
        )
      );
    }
  };

  const markAsRead = async (notiId, candidateId) => {
    try {
      await axios.get(
        `${BASE_URL}hirelink_apis/candidate/notification-read/${notiId}`
      );

      // 🔄 Reload notifications after update
      loadNotifications(candidateId);
    } catch (err) {
      console.error("Mark read error", err);
    }
  };

  return (
    <div className="notification-page">
      {/* HEADER */}
      <div className="notification-header">
        <h2>Notifications</h2>
        <span className="count">{notifications.length}</span>
      </div>

      {/* LIST */}
      <div className="notification-list">
        {notifications.length === 0 && (
          <p className="text-muted">No notifications yet</p>
        )}

        {notifications.map((item) => (
          <div
            key={item.noti_id}
            className={`notification-item ${
              item.noti_is_read == 0 ? "unread" : ""
            }`}
            onClick={() => handleClick(item)}
          >
            {/* ICON */}
            <div className="icon-box">
              {item.noti_type === "interview" ? "📅" : "🔔"}
            </div>

            {/* CONTENT */}
            <div className="notification-content">
              <p className="title">{item.noti_title}</p>
              <p className="message">{item.noti_message}</p>
            </div>

            {/* RIGHT SIDE */}
            <div className="right">
              <span className="time">
                {new Date(item.noti_created_date).toLocaleString()}
              </span>

              {item.noti_is_read == 0 && <span className="dot" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
