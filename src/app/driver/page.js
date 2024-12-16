// import { useEffect, useState } from "react";
import NotificationList from "../../components/NotificationList";
import SendNotification from "../../components/SendNotification";

export default function Home() {
  const userId = "1"; // Replace with dynamic user ID based on authentication

//   const [userId, changeUserId] = useState(1)

//   useEffect

  return (
    <div>
        {/* <input type="number"></input>
        <button onClick={changeUserId()}>Hey!</button> */}
        <SendNotification />
        <NotificationList userId={userId} />
    </div>
  );
}
