import { useEffect } from 'react';
import L from 'leaflet';
import { useMap } from 'react-leaflet';
import 'leaflet-routing-machine';
import "leaflet-control-geocoder";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "./custom-leaflet.css";
// Fix for missing marker images in Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = ({origin = null, destination = null}) => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([21.034229119985238, 105.78198599412406], 10);

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Initialize routing control
    const routingControl = L.Routing.control({
      waypoints: (origin == null || destination == null) ? [] : [
        L.latLng(origin.lat, origin.lng), // Starting point
        L.latLng(destination.lat, destination.lng),  // Ending point
      ], // Empty by default
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      suggest: L.Control.Geocoder.nominatim(),
      showAlternatives: false,
      altLineOptions: {
        styles: [{ color: "blue", opacity: 0.5, weight: 2 }],
      },
      createMarker: function (i, waypoint, n) {
        const customIcon = L.icon({
          iconUrl:
            i === 0
              ? "https://cdn-icons-png.flaticon.com/512/684/684908.png" // Start icon
              : "https://cdn-icons-png.flaticon.com/512/684/684908.png", // End icon
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });
        return L.marker(waypoint.latLng, { icon: customIcon });
      },
    }).addTo(map);

    // Update waypoints when origin or destination changes
    if (origin && destination) {
      routingControl.setWaypoints([
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng),
      ]);
    }

    // Handle location errors
    map.on('locationerror', function (e) {
      alert('Location access denied or unavailable.');
    });

    // Automatically locate the user
    map.locate({ setView: true, maxZoom: 16 });

    // Add event listener for location found
    map.on('locationfound', function (e) {
      const radius = e.accuracy / 2;
      L.marker(e.latlng).addTo(map)
        .bindPopup(`You are within ${radius} meters from this point`).openPopup();
      L.circle(e.latlng, radius).addTo(map);
    });

    return () => {
      map.remove(); // Clean up on unmount
      map.removeControl(routingControl);
    };
  }, [origin, destination]);

  return <div id="map" style={{ height: '100vh', width: '100%' }} />; // Set height to 80% of the viewport height
};

export default Map;
