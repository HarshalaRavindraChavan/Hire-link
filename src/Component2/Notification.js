import React, { useEffect, useState } from "react";
import SEO from "../SEO";
import { seoConfig } from "../config/seoConfig";
import "../Component2/css/Notification.css";
import axios from "axios";
import { BASE_URL } from "../config/constants";
import { onMessage } from "firebase/messaging";
import { messaging } from "./FirebaseConfig";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../Component2/logo/hirelink.png";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // 🔹 Load notifications from DB
  const loadNotifications = async (candidateId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}candidate/notifications/${candidateId}`,
      );

      if (res.data.status) {
        setNotifications(res.data.data || []);
      }
    } catch (err) {
      toast.error("Notification load error");
    }
  };

  // 🔹 Initial load + LOGIN check
  useEffect(() => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));

    if (!candidate) {
      navigate("/signin");
      return;
    }

    loadNotifications(candidate.can_id);
  }, [navigate]);

  // 🔔 REAL-TIME + POPUP
  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground:", payload);

      const candidate = JSON.parse(localStorage.getItem("candidate"));

      if (
        candidate &&
        payload?.data?.candidate_id === String(candidate.can_id)
      ) {
        // 🔥 Add notification instantly (no refresh)
        const newNoti = {
          noti_id: Date.now(),
          noti_title: payload.notification.title,
          noti_message: payload.notification.body,
          noti_is_read: 0,
          noti_created_date: new Date().toISOString(),
        };

        setNotifications((prev) => [newNoti, ...prev]);

        // 🔔 Popup
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: logo,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Mark as read
  const handleClick = async (item) => {
    const candidate = JSON.parse(localStorage.getItem("candidate"));
    if (!candidate) return;

    // 🔹 Mark as read
    if (item.noti_is_read == 0) {
      await markAsRead(item.noti_id, candidate.can_id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.noti_id === item.noti_id ? { ...n, noti_is_read: 1 } : n,
        ),
      );
    }

    // 🚀 NAVIGATION
    if (item.noti_type === "apply") {
      navigate("/profile/applied-jobs");
      window.location.reload();
    } else if (item.noti_type === "interview") {
      navigate("/profile/interviews");
      window.location.reload();
    } else if (item.noti_type === "job") {
      const keyword = encodeURIComponent(item.noti_job_title || "");
      const place = encodeURIComponent(item.noti_job_place || "");

      navigate(`/jobs?keyword=${keyword}&place=${place}`);
      window.location.reload();
    }
  };

  const markAsRead = async (notiId, candidateId) => {
    try {
      await axios.get(`${BASE_URL}candidate/notification-read/${notiId}`);

      loadNotifications(candidateId);
    } catch (err) {
      toast.error("Mark read error");
    }
  };

  return (
    <>
      <SEO
        title={seoConfig.notification.title}
        description={seoConfig.notification.description}
      />

      <ToastContainer />

      <div className="notification-page">
        {/* HEADER */}
        <div className="notification-header">
          <h2>Notifications</h2>
          <span className="count">{notifications.length}</span>
        </div>

        {/* LIST */}
        <div className="notification-list">
          {notifications.map((item) => (
            <div
              key={item.noti_id}
              className={`ncard ${item.noti_is_read == 0 ? "ncard-unread" : ""}`}
              onClick={() => handleClick(item)}
            >
              {/* LEFT ICON */}
              <div className="ncard-icon">
                {item.noti_type === "job" ? (
                  <img
                    src={`${BASE_URL}Uploads/${item.noti_employer_logo}`}
                    alt="company"
                    className="company-logo"
                  />
                ) : item.noti_type === "interview" ? (
                  "📅"
                ) : item.noti_type === "apply" ? (
                  "🔔"
                ) : (
                  "🔔"
                )}
              </div>

              {/* RIGHT BODY */}
              <div className="ncard-body">
                {/* TOP ROW */}
                <div className="ncard-top">
                  <span className="ncard-title">{item.noti_title}</span>

                  <span className="ncard-time">
                    {new Date(item.noti_created_date).toLocaleString()}
                  </span>
                </div>

                {/* MESSAGE */}
                <div className="ncard-message">{item.noti_message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
