'use client';

import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;

export default function NotificationList({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [display_state, setDisplayState] = useState("none");

  useEffect(() => {
    socket = io();

    // Register the user with the server
    socket.emit("register", userId);

    // Listen for new notifications
    socket.on("new-order", (data) => {
      setNotifications((prev) => [data.message, ...prev]);
      setDisplayState("block");
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
    {/*
      
    <div className="toast" style={{display: {display_state}}} role="alert" aria-live="assertive" aria-atomic="true">
      <div className="toast-header">
        <p className="mx-auto h5 fw-bold m-0">A customer found!</p>
      </div>
      <div className="toast-body d-flex flex-column align-items-center">
        <Image src="/crab.png" className="rounded mr-2" width={50} height={50} alt="..."/>
        <p className="h6 fw-bold m-0">Nguyen Van A</p>
        <p className="h7 fw-bold m-0">51A-123.52</p>
        <p className="h8">CrabBike</p>
      </div>
    </div>
    */}
}
