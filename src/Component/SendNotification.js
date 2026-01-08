import React from "react";
import { socket } from "../socket";

const SendNotification = () => {
  const sendNotification = () => {
    socket.emit("sendNotification", {
      title: "New Job Alert",
      message: "A new job has been posted!",
      time: new Date(),
    });
  };

  return (
    <button className="btn btn-primary" onClick={sendNotification}>
      Send Notification
    </button>
  );
};

export default SendNotification;
