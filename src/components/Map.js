import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
// import "leaflet/dist/leaflet.css";
import "../../node_modules/leaflet/dist/leaflet.css";

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', function (e) {
      const radius = e.accuracy / 2; // Accuracy in meters
      // Add a marker at the user's location
      L.marker(e.latlng).addTo(map).bindPopup(`You are within ${radius} meters of this point.`).openPopup();
      // Add a circle to show accuracy
      L.circle(e.latlng, radius).addTo(map);
    });

    // Handle location errors
    map.on('locationerror', function (e) {
      alert('Location access denied or unavailable.');
    });

    // Add routing functionality

    const customIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/252/252025.png', // Replace with your icon URL
      iconSize: [32, 32], // Size of the icon
      iconAnchor: [16, 32], // Anchor point of the icon
    });
    
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(51.505, -0.09), // Starting point
        L.latLng(51.515, -0.1),  // Ending point
      ],
      routeWhileDragging: true,
      createMarker: function(i, waypoint, n) {
        return L.marker(waypoint.latLng, {
          icon: customIcon,
        });
      },
      // formatter: new L.Routing.Formatter({
      //   distanceTemplate: function(distance) {
      //     return `<span style="color: blue; font-size: 14px;">${distance.toFixed(2)} km</span>`;
      //   },
      //   timeTemplate: function(time) {
      //     return `<span style="color: purple; font-weight: bold;">~${Math.round(time / 60)} min</span>`;
      //   },
      // }),
    }).addTo(map);  

    return () => {
      map.remove(); // Clean up on unmount
      routingControl.getPlan().setWaypoints([]);
    };
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default Map;
