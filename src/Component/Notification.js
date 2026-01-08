import React, { useEffect, useState } from "react";
import { socket } from "../socket";
import "./notification.css";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [data, ...prev]);
    });

    return () => {
      socket.off("receiveNotification");
    };
  }, []);

  return (
    <div className="notification-box">
      <h5>🔔 Notifications</h5>

      {notifications.length === 0 ? (
        <p className="text-muted">No notifications</p>
      ) : (
        notifications.map((item, index) => (
          <div key={index} className="notification-item">
            <strong>{item.title}</strong>
            <p>{item.message}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Notification;
