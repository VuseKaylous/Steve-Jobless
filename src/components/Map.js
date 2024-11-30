import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import "leaflet-control-geocoder";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";

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
      // waypoints: [
      //   L.latLng(props.origin.lat, props.origin.lng), // Starting point
      //   L.latLng(props.destination.lat, props.destination.lng),  // Ending point
      // ],
      waypoints: [] if (origin == null || destination == null) else [
        L.latLng(props.origin.lat, props.origin.lng), // Starting point
        L.latLng(props.destination.lat, props.destination.lng),  // Ending point
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

    // Locate user and update routing start point
    map.locate({ setView: true, maxZoom: 16 });
    map.on('locationfound', function (e) {
      const radius = e.accuracy / 2; // Accuracy in meters

      // Add a marker at the user's location
      L.marker(e.latlng).addTo(map).bindPopup(`You are within ${radius} meters of this point.`).openPopup();

      // Add a circle to show accuracy
      L.circle(e.latlng, radius).addTo(map);

      // Update routing start point
      routingControl.getPlan().setWaypoints([L.latLng(e.latlng)]);
    });

    // Handle location errors
    map.on('locationerror', function (e) {
      alert('Location access denied or unavailable.');
    });

    // Add button for manual geolocation
    const locateButton = L.control({ position: 'topleft' });
    locateButton.onAdd = function () {
      const button = L.DomUtil.create('button', 'locate-button');
      button.innerText = 'Tự định vị';
      button.style.padding = '8px';
      button.style.backgroundColor = 'white';
      button.style.border = '1px solid #ccc';
      button.style.cursor = 'pointer';
      button.addEventListener('click', () => {
        map.locate({ setView: true, maxZoom: 16 });
      });
      return button;
    };
    locateButton.addTo(map);

    return () => {
      map.remove(); // Clean up on unmount
    };
  }, []);

  return <div id="map" style={{ height: '80vh', width: '100%' }} />; // Set height to 80% of the viewport height
};

export default Map;
