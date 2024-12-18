'use client';

import { useState } from "react";

export default function SendNotification() {
  const [userIds, setUserIds] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    const ids = userIds.split(",").map((id) => id.trim());
    const response = await fetch("/api/customer/find_driver", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userIds: ids, message }),
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h2>Send Notification</h2>
      <input
        type="text"
        placeholder="Enter user IDs (comma-separated)"
        value={userIds}
        onChange={(e) => setUserIds(e.target.value)}
      />
      <input
        type="text"
        placeholder="Notification message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send Notification</button>
    </div>
  );
}
