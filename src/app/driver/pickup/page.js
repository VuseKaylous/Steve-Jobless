"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import('../../../components/Map'), { ssr: false});
// import Map from "../../../components/Map";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { geocodeAddress } from "@/components/Utils";
// import L from "leaflet";  // Add Leaflet for geocoding
// const L = dynamic(() => import("leaflet"), { ssr: false });

const DriverPickup = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false);
  const [isOrderProcessed, setIsOrderProcessed] = useState(false); // Track if the order has been processed
  // const geocoder = L.Control.Geocoder.nominatim(); // Instantiate geocoder

  // const [driver, setDriver] = useState(() => {
  //     const storedDriver = localStorage.getItem('driver');
  //     return storedDriver ? JSON.parse(storedDriver) : {name: "", id: ""};
  //   });
  const [driver, setDriver] = useState({name: "", id: ""});

  useEffect(() => {
    const storedDriver = localStorage.getItem('driver');
    if (storedDriver) {
      setDriver(JSON.parse(storedDriver));
    }
    if (driver.id === "") {
      router.push("./login");
    }

  }, [router]);

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

  // Function to fetch the current order
  const fetchOrder = async () => {
    if (isOrderProcessed) return; // Don't fetch if the order is already processed

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
        setIsOrderProcessed(false); // Reset the processed flag when a new order is fetched
      } else {
        setOrder(null);
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  useEffect(() => {
    if (!order) {  // Chỉ gọi lại fetchOrder khi không có đơn
      const interval = setInterval(() => {
        fetchOrder();
      }, 10000); // 10 giây

      // Cleanup interval khi component unmount hoặc có đơn hàng
      return () => clearInterval(interval);
    }
  }, [order]);  // Phụ thuộc vào 'order', chỉ gọi lại khi 'order' thay đổi


  const handleAcceptOrder = async () => {
    setAcceptingOrder(true);
    try {
      const response = await fetch("/api/driver/pickup-accept", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.id, driverId: driver.id }),
      });

      if (response.status === 409) {
        // Đơn hàng đã được nhận bởi tài xế khác
        alert("Đơn hàng đã được nhận bởi tài xế khác. Đang chờ đơn hàng mới...");
        setOrder(null); // Xóa thông tin đơn hàng
        setOrigin(null); // Xóa thông tin vị trí xuất phát
        setDestination(null); // Xóa thông tin vị trí đích
        setIsOrderProcessed(false); // Reset trạng thái để tiếp tục quét đơn
        return; // Kết thúc hàm
      }

      if (!response.ok) throw new Error("Failed to accept order");

      alert("Bạn đã chấp nhận đơn hàng!");
      setOrder(null); // Xóa thông tin đơn hàng
      setIsOrderProcessed(true); // Đánh dấu đơn đã xử lý
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
      alert("Bạn đã từ chối đơn hàng!");

      // Xóa thông tin đơn hàng và địa điểm
      setOrder(null); // Clear the order to avoid showing again
      setOrigin(null); // Clear origin location
      setDestination(null); // Clear destination location
      setIsOrderProcessed(true); // Mark order as processed

      // Tạo khoảng thời gian nghỉ 5 giây trước khi tiếp tục quét đơn
      setTimeout(() => {
        // Quay lại quét đơn sau khi nghỉ 5 giây
        fetchOrder(); // Force re-fetch the order after declining
      }, 10000); // 10 giây nghỉ
    } catch (error) {
      console.error("Error declining order:", error);
    }
  };



  // Function to geocode address to coordinates
  // const geocodeAddress = (address, callback) => {
  //   geocoder.geocode(address, (results) => {
  //     if (results && results.length > 0) {
  //       const { lat, lng } = results[0].center;
  //       callback({ lat, lng });
  //     } else {
  //       console.error("Geocoding failed for address:", address);
  //     }
  //   });
  // };

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
