"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import('../../../components/Map'), { ssr: false});
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { getCoordinates } from "@/components/Utils";

const PointToFinish = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false);

  // const [driver, setDriver] = useState(() => {
  //   const storedDriver = localStorage.getItem("driver");
  //   return storedDriver ? JSON.parse(storedDriver) : null;
  // });
  const [driver, setDriver] = useState({ name: "", id: "" });

  useEffect(() => {
    const storedDriver = localStorage.getItem("driver");
    console.log("Stored driver in localStorage:", storedDriver);

    if (storedDriver) {
      const parsedDriver = JSON.parse(storedDriver);
      console.log("Parsed driver from localStorage:", parsedDriver);
      setDriver(parsedDriver);
    } else {
      console.log("No driver in localStorage, redirecting to login.");
      router.push("./login");
    }
  }, [router]);

  useEffect(() => {
    console.log("Current driver state:", driver);

    // Chỉ redirect nếu driver.id vẫn chưa có sau khi `localStorage` đã được kiểm tra
    if (!driver.id) {
      const storedDriver = localStorage.getItem("driver");
      if (!storedDriver) {
        console.log("Driver ID is missing and no data in localStorage, redirecting.");
        router.push("./login");
      }
    }
  }, [driver, router]);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/driver/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driver_id: driver.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to log out");
      }

      // Xóa thông tin tài xế khỏi localStorage
      localStorage.removeItem("driver");

      // Chuyển hướng đến trang đăng nhập
      router.push("./login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Có lỗi xảy ra khi đăng xuất!");
    }
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
          // geocodeAddress(data.order.destination, (destinationCoords) => {
          //   setDestination(destinationCoords); // Set destination only if origin changes
          //   console.log("Geocoded origin:", destinationCoords); // Log the origin coords
          // });
          const destinationCoords = await getCoordinates(data.order.destination);
          setDestination(destinationCoords);
        }
      } else {
        setOrder(null); // Không có đơn hàng thì xóa thông tin order
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  const checkOrderStatus = async (orderId) => {
    try {
      const response = await fetch(`/api/driver/status?order_id=${orderId}`);
      if (!response.ok) throw new Error("Failed to fetch order status");

      const data = await response.json();
      if (data.status === "hủy") {
        router.push("./payment");
      }
    } catch (error) {
      console.error("Error checking order status:", error);
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

  useEffect(() => {
      if (order) {
        const statusInterval = setInterval(() => {
          checkOrderStatus(order.id);
        }, 5000); // Check order status every 5 seconds

        return () => {
          clearInterval(statusInterval);
        };
      }
    }, [order]);

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
      router.push("./payment");
    } catch (error) {
      console.error("Error accepting order:", error);
      setAcceptingOrder(false);
    }
  };

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
