"use client";

import Map from "../../../components/Map";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import L from "leaflet";

const PointToFinish = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false);

  const [driver, setDriver] = useState(() => {
    const storedDriver = localStorage.getItem("driver");
    return storedDriver ? JSON.parse(storedDriver) : null;
  });

  const geocoder = L.Control.Geocoder.nominatim();

  useEffect(() => {
    if (!driver) {
      router.push("./login");
    }
  }, [driver]);

  const handleLogout = () => {
    localStorage.removeItem("driver");
    setDriver(null);
    router.push("./login");
  };

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/driver/finish-current?driverId=${driver.id}`);
      if (!response.ok) throw new Error("Failed to fetch order");

      const data = await response.json();
      if (data.order) {
        setOrder(data.order);
        console.log("Fetched order:", data.order);
        

        // Kiểm tra nếu địa chỉ đã thay đổi trước khi geocode lại
        if (data.order.destination !== order?.destination) {
          geocodeAddress(data.order.destination, (destinationCoords) => {
            setDestination(destinationCoords); // Set destination only if origin changes
            console.log("Geocoded origin:", destinationCoords); // Log the origin coords
          });
        }
      } else {
        setOrder(null); // Không có đơn hàng thì xóa thông tin order
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    if (driver) {
      fetchOrder(); // Fetch order when driver is available
    }
  }, [driver]); // Only depend on driver

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin({ lat: latitude, lng: longitude });
          console.log("Current location:", { lat: latitude, lng: longitude }); // Log current location
        },
        (error) => {
          console.error("Error fetching current location:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (driver) {
      fetchCurrentLocation();
      const locationInterval = setInterval(fetchCurrentLocation, 10000);

      return () => clearInterval(locationInterval);
    }
  }, [driver]);

  const confirmFinish = async () => {
    setAcceptingOrder(true);
    try {
      const response = await fetch("/api/driver/finish-confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, driverId: driver.id }),
      });
      if (!response.ok) throw new Error("Failed to accept order");
      alert("Bạn đã hoàn thành chuyến đi!");
      setOrder(null);
      setAcceptingOrder(false);
      router.push("/driver/payment");
    } catch (error) {
      console.error("Error accepting order:", error);
      setAcceptingOrder(false);
    }
  };

  const geocodeAddress = (address, callback) => {
    geocoder.geocode(address, (results) => {
      if (results && results.length > 0) {
        const { lat, lng } = results[0].center;
        callback({ lat, lng });
        console.log("Geocoded address:", address, { lat, lng }); // Log geocoded address
      } else {
        console.error("Geocoding failed for address:", address);
      }
    });
  };

  useEffect(() => {
    // Log origin and destination values
    console.log("Origin:", origin);
    console.log("Destination:", destination);
  }, [origin, destination]);

  return (
    <div>
      <nav className="navbar bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ color: "#00b14f" }}>
            CrabForDriver
          </span>
          <div className="d-flex">
            <span style={{ color: "#00b14f" }} className="me-2">
              CHÀO MỪNG, <strong>{driver?.name.toUpperCase()}</strong>.
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
                <strong>Từ:</strong> {order.origin}
              </p>
              <p>
                <strong>Đến:</strong> {order.destination}
              </p>
              <div className="d-flex">
                <button
                  className={`${styles.actionButton} me-2`}
                  onClick={confirmFinish}
                  disabled={acceptingOrder}
                >
                  Đã hoàn thành
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

export default PointToFinish;
