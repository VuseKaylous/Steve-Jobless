"use client";

import React, { useState, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, Autocomplete, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = { width: "100vw", height: "100vh" };
const center = { lat: 21.0285, lng: 105.8542 }; // Trung tâm bản đồ (Hà Nội)

const DriverDirections = () => {
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [startPlace, setStartPlace] = useState(null);
  const [endPlace, setEndPlace] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // Trạng thái hiển thị pop-up

  // Dữ liệu giả khách hàng
  const fakeCustomerData = {
    name: "Nguyễn Văn A",
    phone: "0123456789",
    startPoint: "123 Đường Láng, Hà Nội",
    endPoint: "456 Phố Huế, Hà Nội",
    price: "100,000 VNĐ"
  };

  // Xử lý sự kiện lấy chỉ đường
  const handleGetDirections = useCallback(() => {
    if (!startPlace || !endPlace) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: startPlace.geometry.location,
        destination: endPlace.geometry.location,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK") {
          setDirections(result);
        } else {
          console.error("Không thể lấy chỉ đường:", status);
        }
      }
    );
  }, [startPlace, endPlace]);

  // Định vị vị trí hiện tại của người dùng
  const locateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(location);
          map.panTo(location); // Đặt vị trí bản đồ tại vị trí hiện tại
        },
        (error) => {
          console.error("Lỗi khi lấy vị trí hiện tại:", error);
        }
      );
    } else {
      console.error("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  };

  // Hiển thị pop-up "Có Khách"
  const handleShowPopup = () => {
    setShowPopup(true);
  };

  // Đóng pop-up
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Xử lý sự kiện sign out
  const handleSignOut = () => {
    console.log("Signing out...");
    // Logic để sign out
    alert("Bạn đã đăng xuất!");
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} libraries={["places"]}>
      <div style={{ position: "relative" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={13}
          onLoad={(mapInstance) => setMap(mapInstance)}
        >
          {currentLocation && <Marker position={currentLocation} />}
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>

        <div style={{ display: "flex", gap: "10px", padding: "10px", backgroundColor: "#fff", position: "absolute", top: "10px", left: "10px", zIndex: 1000 }}>
          <Autocomplete onLoad={(autocomplete) => setStartPlace(autocomplete)} onPlaceChanged={() => setStartPlace(startPlace.getPlace())}>
            <input type="text" placeholder="Điểm xuất phát" style={{ padding: "8px", width: "200px" }} />
          </Autocomplete>
          <Autocomplete onLoad={(autocomplete) => setEndPlace(autocomplete)} onPlaceChanged={() => setEndPlace(endPlace.getPlace())}>
            <input type="text" placeholder="Điểm đến" style={{ padding: "8px", width: "200px" }} />
          </Autocomplete>
          <button onClick={handleGetDirections} style={{ padding: "8px 12px" }}>Lấy chỉ đường</button>
          <button onClick={locateCurrentPosition} style={{ padding: "8px 12px" }}>Vị trí hiện tại</button>
          <button onClick={handleShowPopup} style={{ padding: "8px 12px", backgroundColor: "#4CAF50", color: "white" }}>Có Khách</button>
        </div>

        {/* Nút Sign Out */}
        <button
          onClick={handleSignOut}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 16px",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          Sign Out
        </button>

        {/* Pop-up thông tin khách hàng */}
        {showPopup && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1001,
          }}>
            <div style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              width: "500px",
              textAlign: "center",
              fontSize: "16px"
            }}>
              <h2 style={{ fontSize: "24px", marginBottom: "15px" }}>Thông tin khách hàng</h2>
              <p><strong>Tên:</strong> {fakeCustomerData.name}</p>
              <p><strong>Số điện thoại:</strong> {fakeCustomerData.phone}</p>
              <p><strong>Điểm bắt đầu:</strong> {fakeCustomerData.startPoint}</p>
              <p><strong>Điểm kết thúc:</strong> {fakeCustomerData.endPoint}</p>
              <p><strong>Giá tiền:</strong> {fakeCustomerData.price}</p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px" }}>
                <button
                  onClick={handleClosePopup}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    fontSize: "16px",
                    borderRadius: "8px",
                    width: "120px",
                  }}
                >
                  Chấp nhận
                </button>
                <button
                  onClick={handleClosePopup}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#f44336",
                    color: "white",
                    fontSize: "16px",
                    borderRadius: "8px",
                    width: "120px",
                  }}
                >
                  Từ chối
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </LoadScript>
  );
};

export default DriverDirections;
