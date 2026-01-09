import React, { useState, useEffect } from "react";
import "../Component2/css/Notification.css";

const notifications = [
  {
    id: 1,
    title: "New Job Alert",
    message: "Amazon posted a new React Developer role.",
    time: "2 mins ago",
    unread: true,
  },
  {
    id: 2,
    title: "Application Update",
    message: "Your application has been shortlisted.",
    time: "1 hour ago",
    unread: false,
  },
  {
    id: 3,
    title: "Interview Scheduled",
    message: "Interview scheduled for tomorrow at 11 AM.",
    time: "Yesterday",
    unread: false,
  },
];

const Notification = () => {
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Close on outside click (mobile friendly)
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest(".notification-wrapper")) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="notification-wrapper">
      <a
        href="#"
        className="nav-link-custom ms-2 me-2 position-relative"
        onClick={(e) => {
          e.preventDefault();
          setOpen(!open);
        }}
      >
        <i className="fa fa-bell"></i>
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount}</span>
        )}
      </a>

      {open && (
        <div className="notification-dropdown">
          <div className="notification-header">
            <span>Notifications</span>
            <small>{unreadCount} unread</small>
          </div>

          <ul className="notification-list">
            {notifications.map(item => (
              <li
                key={item.id}
                className={item.unread ? "unread" : ""}
              >
                <h6>{item.title}</h6>
                <p>{item.message}</p>
                <span className="time">{item.time}</span>
              </li>
            ))}
          </ul>

          <div className="notification-footer">
            <a href="#">View all</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
