import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
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

const Map = ({ origin = null, destination = null }) => {
  const [userLocation, setUserLocation] = useState(null);
  const locateButtonRef = useRef(null); // Sử dụng ref để tham chiếu đến nút

  useEffect(() => {
    if (typeof window === 'undefined') {
      return; // Kiểm tra môi trường client-side
    }

    console.log("Initializing map...");

    // Initialize the map
    const map = L.map('map');
    console.log("Map initialized:", map);

    // Add a tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Handle user manual location
    const locateUser = () => {
      map.locate({ setView: true, maxZoom: 16 });
    };

    // Add button for manual location
    const locateButton = L.control({ position: 'topright' });
    locateButton.onAdd = () => {
      const button = L.DomUtil.create('button', 'locate-button');
      button.innerHTML = 'Locate Me';
      button.style.padding = '10px';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = '#fff';
      button.style.border = '1px solid #ccc';
      button.style.borderRadius = '5px';
      L.DomEvent.on(button, 'click', () => {
        locateUser();  // Gọi hàm locateUser khi bấm nút
      });
      locateButtonRef.current = button; // Lưu tham chiếu đến nút
      return button;
    };
    locateButton.addTo(map);

    // Initialize routing control
    const routingControl = L.Routing.control({
      waypoints: (origin == null || destination == null) ? [] : [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng),
      ],
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      suggest: L.Control.Geocoder.nominatim(),
      showAlternatives: false,
      altLineOptions: {
        styles: [{ color: "blue", opacity: 0.5, weight: 2 }],
      },
      createMarker: function (i, waypoint, n) {
        console.log(`Creating marker at waypoint ${i}:`, waypoint.latLng);
        const customIcon = L.icon({
          iconUrl:
            i === 0
              ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
              : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });
        return L.marker(waypoint.latLng, { icon: customIcon });
      },
    }).addTo(map);

    console.log("Routing control initialized:", routingControl);

    // Update waypoints when origin or destination changes
    if (origin && destination) {
      console.log("Setting waypoints:", origin, destination);
      routingControl.setWaypoints([
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng),
      ]);
    } else {
      console.log("Origin or destination is null. Skipping waypoint update.");
    }

    // Handle location errors
    map.on('locationerror', function (e) {
      console.error('Location error:', e.message);
      alert('Location access denied or unavailable.');
    });

    // Automatically trigger user location after 3 seconds
    setTimeout(() => {
      if (locateButtonRef.current) {
        locateButtonRef.current.click(); // Simulate button click
      }
    }, 3000);

    // Add event listener for location found
    map.on('locationfound', function (e) {
      console.log("Location found:", e);
      const radius = e.accuracy / 2;

      // Define marker icon
      const markerIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Anchor point of the icon
      });

      // Add marker to map
      const marker = L.marker(e.latlng, { icon: markerIcon });
      marker.addTo(map)
        .bindPopup(`You are within ${radius} meters from this point`).openPopup();

      // Add circle to map
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);

      // If origin and destination are null, set them to the current location
      if (!origin && !destination) {
        setUserLocation(e.latlng); // Save user location in state
      }
    });

    // Add safeguard for moveend event
    map.on('moveend', function () {
      try {
        const center = map.getCenter();
        console.log("Map center moved to:", center);
      } catch (err) {
        console.error("Error during map moveend:", err);
      }
    });

    return () => {
      console.log("Cleaning up map...");
      map.remove(); // Clean up on unmount
      map.removeControl(routingControl);
    };
  }, [origin, destination]); // Ensure effect runs when origin or destination changes

  return <div id="map" style={{ height: '85vh', width: '100%' }} />;
};

export default Map;
