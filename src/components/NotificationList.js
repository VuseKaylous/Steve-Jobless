'use client';

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function NotificationList({ userId }) {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket = io();

    // Register the user with the server
    socket.emit("register", userId);

    // Listen for new notifications
    socket.on("new-notification", (data) => {
      setNotifications((prev) => [data.message, ...prev]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
