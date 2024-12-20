"use client";

import Map from "../../../components/Map";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import L from "leaflet";

const PointToCustomer = () => {
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
      const response = await fetch(`/api/driver/customer-current?driverId=${driver.id}`);
      if (!response.ok) throw new Error("Failed to fetch order");

      const data = await response.json();
      if (data.order) {
        setOrder(data.order);
        localStorage.setItem('order_info', JSON.stringify(data.order));

        // Kiểm tra nếu địa chỉ đã thay đổi trước khi geocode lại
        if (data.order.origin !== order?.origin) {
          geocodeAddress(data.order.origin, (originCoords) => {
            setDestination(originCoords); // Set destination only if origin changes
          });
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
      const response = await fetch('/api/driver/status', {
        method: 'POST', // Thay đổi phương thức thành POST
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId }) // Gửi orderId trong body dưới dạng JSON
      });

      if (!response.ok) throw new Error('Failed to fetch order status');

      const data = await response.json();
      if (data.status === 'hủy') {
        router.push('./payment');
      }
    } catch (error) {
      console.error('Error checking order status:', error);
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
      const locationInterval = setInterval(fetchCurrentLocation, 20000);

      return () => {
        clearInterval(locationInterval);
      };
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

  const confirmCustomer = async () => {
    setAcceptingOrder(true);
    try {
      const response = await fetch(`/api/driver/customer-confirm?orderId=${order.id}&driverId=${driver.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to accept order");
      setOrder(null);
      setAcceptingOrder(false);
      router.push("./point-to-finish");
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
                  onClick={confirmCustomer}
                  disabled={acceptingOrder}
                >
                  Đã đón khách
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

export default PointToCustomer;
