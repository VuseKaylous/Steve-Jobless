"use client";

import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const DriverDirections = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [start, setStart] = useState(""); // Điểm bắt đầu (lng, lat)
  const [end, setEnd] = useState(""); // Điểm đích (lng, lat)
  const [customIcon, setCustomIcon] = useState(null);

  useEffect(() => {
    // Kiểm tra nếu đang chạy trên trình duyệt
    if (typeof window !== "undefined") {
      const mapInstance = L.map(mapRef.current).setView([21.0285, 105.8542], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);

      // Tạo icon cho marker
      const customMarkerIcon = L.icon({
        iconUrl: './marker-icon-2x.png',
        shadowUrl: './marker-shadow.png',
        iconSize: [25, 41], // Kích thước của marker
        iconAnchor: [12, 41], // Điểm neo của marker
        shadowSize: [41, 41], // Kích thước của shadow
      });

      setMap(mapInstance);
      setCustomIcon(customMarkerIcon);

      return () => mapInstance.remove();
    }
  }, []);

  const handleLocateCurrentPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setStart(`${longitude},${latitude}`);

          // Đặt bản đồ tại vị trí người dùng
          if (map) {
            map.setView([latitude, longitude], 13);
            // Thêm marker tại vị trí hiện tại của người dùng
            L.marker([latitude, longitude], { icon: customIcon }) // Sử dụng icon tùy chỉnh
              .addTo(map)
              .bindPopup("Bạn đang ở đây!")
              .openPopup();
          }
        },
        (error) => {
          console.error("Không thể lấy vị trí hiện tại:", error);
        }
      );
    } else {
      console.error("Trình duyệt của bạn không hỗ trợ định vị.");
    }
  };

  const handleGetDirections = async () => {
    if (!start || !end) return;

    try {
      const [startLng, startLat] = start.split(",").map(Number);
      const [endLng, endLat] = end.split(",").map(Number);

      const apiKey = "5b3ce3597851110001cf62482038d6d883af4bd682bc6440d104aebf"; // Thay bằng API key của bạn từ OpenRouteService
      const response = await axios.get(`https://api.openrouteservice.org/v2/directions/driving-car`, {
        params: {
          api_key: apiKey,
          start: `${startLng},${startLat}`,
          end: `${endLng},${endLat}`,
        },
      });

      const coordinates = response.data.features[0].geometry.coordinates.map((coord) => [coord[1], coord[0]]);

      // Xóa layer cũ nếu có
      if (map) {
        map.eachLayer((layer) => {
          if (layer._leaflet_id && layer.options && layer.options.className === "route-line") {
            map.removeLayer(layer);
          }
        });

        // Thêm layer chỉ đường vào bản đồ
        const routeLayer = L.polyline(coordinates, { color: "blue", weight: 5, className: "route-line" });
        routeLayer.addTo(map);

        // Điều chỉnh bản đồ để xem toàn bộ tuyến đường
        map.fitBounds(routeLayer.getBounds());
      }
    } catch (error) {
      console.error("Không thể lấy chỉ đường:", error);
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <div style={{ display: "flex", gap: "10px", padding: "10px", backgroundColor: "#fff", position: "absolute", top: "10px", left: "10px", zIndex: 1000 }}>
        <input
          type="text"
          placeholder="Điểm đích (lng, lat)"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
        <button onClick={handleGetDirections}>Lấy chỉ đường</button>
        <button onClick={handleLocateCurrentPosition}>Vị trí hiện tại</button>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default DriverDirections;
