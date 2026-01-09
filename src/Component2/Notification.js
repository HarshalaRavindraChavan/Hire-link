import React from "react";
import "../Component2/css/Notification.css";

const notifications = [
  {
    id: 1,
    title: "New job recommendation",
    message: "React Developer at Amazon · Bangalore",
    time: "2m",
    unread: false,
    icon: "💼",
  },
  {
    id: 2,
    title: "Application viewed",
    message: "Your application for Frontend Engineer was viewed",
    time: "1h",
    unread: false,
    icon: "👀",
  },
  {
    id: 3,
    title: "Interview scheduled",
    message: "Interview scheduled for tomorrow at 11:00 AM",
    time: "1d",
    unread: false,
    icon: "📅",
  },

  
];

export default function NotificationPage() {
  const handleClick = (item) => {
    console.log("Clicked notification:", item);
  };

  return (
    <div className="notification-page">
      <div className="notification-header">
        <h2>Notifications</h2>
        <span className="count">{notifications.length}</span>
      </div>

      <div className="notification-list">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`notification-item ${item.unread ? "unread" : ""}`}
            onClick={() => handleClick(item)}
          >
            <div className="icon-box">{item.icon}</div>

            <div className="notification-content">
              <p className="title">{item.title}</p>
              <p className="message">{item.message}</p>
            </div>

            <div className="right">
              <span className="time">{item.time}</span>
              {item.unread && <span className="dot" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
