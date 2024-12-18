'use client';

// import { useEffect, useState } from "react";
import NotificationList from "../../components/NotificationList";
import SendNotification from "../../components/SendNotification";

export default function Home() {
  const userId = localStorage.userId; // Replace with dynamic user ID based on authentication

//   const [userId, changeUserId] = useState(1)

//   useEffect

  return (
    <div>
        {/* <input type="number"></input>
        <button onClick={changeUserId()}>Hey!</button> */}
        <h1> User Id: {userId}</h1>
        <SendNotification />
        <NotificationList userId={userId} />
    </div>
  );
}
