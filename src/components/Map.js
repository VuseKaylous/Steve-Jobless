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
  const locateButtonRef = useRef(null); // Reference for manual locate button
  const mapExists = useRef(false); // To track if map exists
  const routingControlRef = useRef(null); // Reference to routing control to update waypoints

  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log("Initializing map...");

    const map = L.map('map');
    mapExists.current = true;

    console.log("Map initialized:", map);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    const routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      geocoder: L.Control.Geocoder.nominatim(),
      suggest: L.Control.Geocoder.nominatim(),
      showAlternatives: false,
      altLineOptions: {
        styles: [{ color: "blue", opacity: 0.5, weight: 2 }],
      },
      createMarker: function (i, waypoint, n) {
        const customIcon = L.icon({
          iconUrl: i === 0
            ? "https://cdn-icons-png.flaticon.com/512/684/684908.png"
            : "https://cdn-icons-png.flaticon.com/512/684/684908.png",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });
        return L.marker(waypoint.latLng, { icon: customIcon });
      },
    }).addTo(map);

    routingControlRef.current = routingControl;

    const updateWaypoints = () => {
      if (origin && destination && routingControlRef.current) {
        console.log("Updating origin and destination:");
        console.log("Origin:", origin);
        console.log("Destination:", destination);

        try {
          routingControl.setWaypoints([
            L.latLng(origin.lat, origin.lon),
            L.latLng(destination.lat, destination.lon),
          ]);
        } catch (err) {
          console.error("Error setting waypoints:", err);
        }
      }
    };

    updateWaypoints();

    const locateUser = () => {
      if (mapExists.current) {
        map.locate({ setView: true, maxZoom: 16 });
      }
    };

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
        locateUser();
      });
      locateButtonRef.current = button;
      return button;
    };
    locateButton.addTo(map);

    map.on('locationerror', function (e) {
      console.error('Location error:', e.message);
      alert('Location access denied or unavailable.');
    });

    setTimeout(() => {
      if (locateButtonRef.current) {
        locateButtonRef.current.click();
      }
    }, 3000);

    map.on('locationfound', function (e) {
      console.log("Location found:", e);
      const radius = e.accuracy / 2;

      const markerIcon = L.icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      });

      L.marker(e.latlng, { icon: markerIcon }).addTo(map)
        .bindPopup(`You are within ${radius} meters from this point`).openPopup();
      L.circle(e.latlng, radius).addTo(map);

      if (!origin && !destination) {
        setUserLocation(e.latlng);
      }
    });

    return () => {
      console.log("Cleaning up map...");
      if (mapExists.current) {
        if (routingControlRef.current) {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
        }
        map.off();
        map.remove();
      }
      mapExists.current = false;
    };
  }, [origin, destination]);

  return <div id="map" style={{ height: '85vh', width: '100%' }} />;
};

export default Map;
