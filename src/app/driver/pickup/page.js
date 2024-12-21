"use client";

import dynamic from "next/dynamic";
const Map = dynamic(() => import('../../../components/Map'), { ssr: false });
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

// Hàm để lấy tọa độ từ Nominatim
const getCoordinates = async (address) => {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&addressdetails=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.length > 0) {
      const { lat, lon } = data[0]; // Lấy lat và lon từ kết quả
      return { lat, lon };
    } else {
      throw new Error("Không tìm thấy địa chỉ");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return null; // Trả về null nếu có lỗi
  }
};

const DriverPickup = () => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [acceptingOrder, setAcceptingOrder] = useState(false);
  const [isOrderProcessed, setIsOrderProcessed] = useState(false);
  const [driver, setDriver] = useState({ name: "", id: "" });
  const [originCoords, setOriginCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [isMapReady, setIsMapReady] = useState(false); // Trạng thái kiểm soát việc tải bản đồ

  useEffect(() => {
    const storedDriver = localStorage.getItem("driver");

    if (storedDriver) {
      const parsedDriver = JSON.parse(storedDriver);
      setDriver(parsedDriver);
    } else {
      console.log("No driver in localStorage, redirecting to login.");
      router.push("./login");
    }
  }, []);

  // Lấy thông tin đơn khi driver.id đã có
  useEffect(() => {
    console.log(driver);
    if (driver.id) {
      fetchOrder(driver.id);
    } else {
      console.log("Driver ID is missing.");
    }
  }, [driver.id]);  // Chỉ gọi fetchOrder khi driver.id thay đổi

  // Hàm lấy đơn hàng hiện tại
  const fetchOrder = async (driver_id) => {
    if (!driver_id) {
      console.log("Driver ID is missing, cannot fetch order.");
      return;
    }

    const url = `/api/driver/pickup-current`;
    console.log("Request URL:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ driverId: driver_id }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch order");
      }

      const data = await response.json();
      console.log("Fetched order data:", data);

      if (data.order) {
        // Cập nhật thông tin đơn hàng
        setOrder(data.order);
        setOrigin(data.order.origin);
        setDestination(data.order.destination);

        // Gọi Nominatim API để lấy tọa độ cho các địa điểm
        const originCoordinates = await getCoordinates(data.order.origin);
        const destinationCoordinates = await getCoordinates(data.order.destination);

        if (originCoordinates) {
          console.log("Origin coordinates:", originCoordinates);
          // Lưu tọa độ của điểm xuất phát
          setOriginCoords(originCoordinates);
          console.log("Updated Origin Coordinates:", originCoordinates);
        }

        if (destinationCoordinates) {
          console.log("Destination coordinates:", destinationCoordinates);
          // Lưu tọa độ của điểm đến
          setDestinationCoords(destinationCoordinates);
          console.log("Updated Destination Coordinates:", destinationCoordinates);
        }
      } else {
        console.log("No order data found");
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  };

  // Sử dụng useEffect để thiết lập việc tải bản đồ sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMapReady(true); // Sau 3 giây, cho phép tải bản đồ
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timeout when the component is unmounted or updated
  }, []);

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
      console.log("Driver info removed from localStorage");

      // Chuyển hướng đến trang đăng nhập
      router.push("./login");
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Có lỗi xảy ra khi đăng xuất!");
    }
  };

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
      console.log(order.id + " " + driver.id);
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
        fetchOrder(driver.id); // Force re-fetch the order after declining
      }, 10000); // 10 giây nghỉ
      // ??? :D
    } catch (error) {
      console.error("Error declining order:", error);
    }
  };

  useEffect(() => {
    const storedDriver = localStorage.getItem("driver");
    let driver_id = -1;
    if (storedDriver) {
      const parsedDriver = JSON.parse(storedDriver);
      // setDriver(parsedDriver);
      driver_id = parsedDriver.id;
    } else {
      console.log("No driver in localStorage, redirecting to login.");
      router.push("./login");
    }
    // Hàm fetchOrder được gọi ngay lập tức khi component được render
    if (!order) {
      fetchOrder(driver_id);
    }
    // Thiết lập gọi lại fetchOrder mỗi 10 giây khi không có đơn
    const intervalId = setInterval(() => {
      if (!order) {
        fetchOrder(driver_id);
      }
    }, 10000); // 10 giây

    // Clean up interval khi component bị hủy hoặc thay đổi
    return () => clearInterval(intervalId);
  }, [order]);  // Chạy lại khi order thay đổi


  return (
    <div>
      <nav className="navbar bg-light mb-4">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1" style={{ color: "#00b14f" }}>
            CrabForDriver
          </span>
          <div className="d-flex">
            <span style={{ color: "#00b14f" }} className="me-1">
              CHÀO MỪNG, <strong>{driver.name.toUpperCase()}</strong>.
            </span>
            <button onClick={handleLogout} className={styles.logOut}>
              ĐĂNG XUẤT
            </button>
          </div>
        </div>
      </nav>

      <div className="d-flex">
        <div id="sidebar" className="d-flex flex-column px-3" style={{ width: "33%" }}>
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
                <strong>Từ:</strong> {origin}
              </p>
              <p>
                <strong>Đến:</strong> {destination}
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
          {isMapReady ? (
            <Map originCoords={originCoords} destinationCoords={destinationCoords} />
          ) : (
            <p>Đang tải bản đồ...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverPickup;
