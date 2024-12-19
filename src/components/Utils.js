'use client';

import dynamic from "next/dynamic";
const L = dynamic(() => import("leaflet"), { ssr: false });

const geocodeAddress = (address, callback) => {
  const geocoder = L.Control.Geocoder.nominatim(); // Instantiate geocoder

  geocoder.geocode(address, (results) => {
    if (results && results.length > 0) {
      const { lat, lng } = results[0].center;
      callback({ lat, lng });
    } else {
      console.error("Geocoding failed for address:", address);
    }
  });
};

const geocodeAddressAll = (address, callback) => {
  const geocoder = L.Control.Geocoder.nominatim(); // Instantiate geocoder

  geocoder.geocode(address, (results) => {
    callback(results);
    // if (results && results.length > 0) {
    //   const { lat, lng } = results[0].center;
    //   callback({ lat, lng });
    // } else {
    //   console.error("Geocoding failed for address:", address);
    // }
  });
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat)/2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a));
  };

const FindCost = (distance) => {
    return (12000 * Math.min(2, distance) + Math.max(distance-2, 0) * 3400).toFixed(0)
} 

export { FindCost, calculateDistance, geocodeAddress, geocodeAddressAll }