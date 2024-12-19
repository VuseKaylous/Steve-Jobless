"use client";

import Map from "../../../components/Map";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import L from "leaflet";  // Add Leaflet for geocoding

const DriverPickup = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false);
  const geocoder = L.Control.Geocoder.nominatim(); // Instantiate geocoder

  const [driver, setDriver] = useState(() => {
      const storedDriver = localStorage.getItem('driver');
      return storedDriver ? JSON.parse(storedDriver) : {name: "", id: ""};
    });

  useEffect(() => {
    if (driver.id === "") {
      router.push("./login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("driver");
    router.push("./login");
  };

  // Function to fetch the current order
  const fetchOrder = async () => {
    try {
      const response = await fetch(
        `/api/driver/pickup-current?driverId=${driver.id}`
      );
      if (!response.ok) throw new Error("Failed to fetch order");
      const data = await response.json();
      if (data.order) {
        setOrder(data.order);
        // Geocode the origin and destination
        geocodeAddress(data.order.origin, (originCoords) => {
          setOrigin(originCoords);
        });
        geocodeAddress(data.order.destination, (destCoords) => {
          setDestination(destCoords);
        });
      } else {
        setOrder(null);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  // Set up polling to fetch order every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrder();
    }, 10000); // 10 seconds interval

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [driver]);

  const handleAcceptOrder = async () => {
    setAcceptingOrder(true);
    try {
      const response = await fetch("/api/driver/pickup-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, driverId: driver.id }),
      });
      if (!response.ok) throw new Error("Failed to accept order");
      setOrder(null); // Clear order to avoid showing again
      setAcceptingOrder(false);
      router.push('/driver/point-to-customer');
    } catch (error) {
      console.error("Error accepting order:", error);
      setAcceptingOrder(false);
    }
  };

  const handleDeclineOrder = async () => {
    try {
      const response = await fetch("/api/driver/pickup-decline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, driverId: driver.id }),
      });
      if (!response.ok) throw new Error("Failed to decline order");
      setOrder(null); // Clear order to avoid showing again
    } catch (error) {
      console.error("Error declining order:", error);
    }
  };

  // Function to geocode address to coordinates
  const geocodeAddress = (address, callback) => {
    geocoder.geocode(address, (results) => {
      if (results && results.length > 0) {
        const { lat, lng } = results[0].center;
        callback({ lat, lng });
      } else {
        console.error("Geocoding failed for address:", address);
      }
    });
  };

  return (
    <div>
      <nav className="navbar bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ color: "#00b14f" }}>
            CrabForDriver
          </span>
          <div className="d-flex">
            <span style={{ color: "#00b14f" }} className="mt-2 me-1">
              CHÀO MỪNG, <strong>{driver.name.toUpperCase()}</strong>.
            </span>
            <button onClick={handleLogout} className={styles.logOut}>
              ĐĂNG XUẤT
            </button>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div
          id="sidebar"
          className="d-flex flex-column px-3"
          style={{ width: "33%" }}
        >
          {!order ? (
            <p style={{ color: "#777" }}>Chưa có đơn</p>
          ) : (
            <div>
              <p>
                <strong>Tên khách hàng:</strong> {order.customer_name}
              </p>
              <p>
                <strong>Số điện thoại:</strong> {order.customer_phone}
              </p>
              <p>
                <strong>Từ:</strong> {order.origin}
              </p>
              <p>
                <strong>Đến:</strong> {order.destination}
              </p>
              <div className="d-flex">
                <button
                  className={`${styles.actionButton} me-2`}
                  onClick={handleAcceptOrder}
                  disabled={acceptingOrder}
                >
                  Chấp nhận
                </button>
                <button
                  className={`${styles.actionButton} ${styles.declineButton}`}
                  onClick={handleDeclineOrder}
                >
                  Từ chối
                </button>
              </div>
            </div>
          )}
        </div>
        <div style={{ flexGrow: 1 }}>
          <Map origin={origin} destination={destination} />
        </div>
      </div>
    </div>
  );
};

export default DriverPickup;
