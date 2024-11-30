import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import "leaflet-control-geocoder";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

const Map = (props) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([21.034229119985238, 105.78198599412406], 10);

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
    
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(props.origin.lat, props.origin.lng), // Starting point
        L.latLng(props.destination.lat, props.destination.lng),  // Ending point
      ],
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      suggest: L.Control.Geocoder.nominatim(),
      showAlternatives: false,
      altLineOptions: {
        styles: [{ color: "blue", opacity: 0.5, weight: 2 }],
      },
      createMarker: function(i, waypoint, n) {
        const customIcon = L.icon({
          iconUrl:
            i === 0
              ? "https://cdn-icons-png.flaticon.com/512/684/684908.png" // Start icon
              : "https://cdn-icons-png.flaticon.com/512/684/684908.png", // End icon
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });   
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
