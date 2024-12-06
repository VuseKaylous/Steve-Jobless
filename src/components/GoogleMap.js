// components/GoogleMap.js
import React, { useEffect, useRef } from "react";

const GoogleMap = ({ start, end }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.google && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: start,
        zoom: 13,
      });

      // Khởi tạo dịch vụ chỉ đường
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);

      if (start && end) {
        directionsService.route(
          {
            origin: start,
            destination: end,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              directionsRenderer.setDirections(result);
            } else {
              console.error("Không thể lấy chỉ đường:", status);
            }
          }
        );
      }
    }
  }, [start, end]);

  return <div ref={mapRef} style={{ width: "100%", height: "100vh" }} />;
};

export default GoogleMap;
