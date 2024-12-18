"use client";

import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css"
import Map from "../../../components/Map.js";
import Found from './found';
import React, { useState, useEffect } from 'react';

const Booking = () => {
  const router = useRouter();
  const [originalStartingPoint, setStartingPoint] = useState('');
  const [originalDestinationPoint, setDestinationPoint] = useState('');
  const [StartingPoint, setFinalStartingPoint] = useState('');
  const [DestinationPoint, setFinalDestinationPoint] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [destSuggestions, setDestSuggestions] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const geocoder = L.Control.Geocoder.nominatim();
  const customer = JSON.parse(localStorage.getItem('customer'));
  const [showPanel, setShowPanel] = useState(false);
  const [distance, setDistance] = useState(null);
  const [isFindingDriver, setIsFindingDriver] = useState(false);
  const [driverFounded, setdriverFounded] = useState(false);
  const [driverId, setDriverId] = useState(null);
  const [orderID, setOrderID] = useState(null);

  useEffect(() => {
    if (!customer) {
      router.push('./login');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('customer'); // Remove the token from localStorage
    router.push('./login');
  };

  const customerId = customer ? customer.id : null;
  const customerName = customer ? customer.name : null;

  const handleFindDriverClick = async () => {
    if (StartingPoint && DestinationPoint) {
      setIsFindingDriver(true);
      const requestData = JSON.stringify({
        customer_id: customerId,
        origin: StartingPoint,
        destination: DestinationPoint,
      });
      try {
        const response = await fetch('/api/customer/booking', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: requestData,
        });
        if (!response.ok) {
          throw new Error('Failed to find driver');
        }
        const data = await response.json();
        setDriverId(data.driver_id); // Set the driver ID
        setOrderID(data.order_id);
        setdriverFounded(true);
        setIsFindingDriver(false);
      } catch (error) {
        console.error('Error finding driver:', error);
      }
    } else {
      console.log('Both starting point and destination point are required');
    }
  };

  useEffect(() => {
    if (StartingPoint && DestinationPoint) {
      setShowPanel(true);
      if (origin && destination) {
        const dist = calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng);
        setDistance(dist);
      }
    } else {
      setShowPanel(false);
    }
  }, [StartingPoint, DestinationPoint, origin, destination]);

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

  useEffect(() => {
    const startInput = document.querySelector('.leaflet-routing-geocoder-start');
    const destInput = document.querySelector('.leaflet-routing-geocoder-dest');

    if (startInput) {
      L.DomEvent.addListener(startInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          geocoder.geocode(startInput.value, (results) => {
            const suggestions = results.map(result => result.name);
            setStartSuggestions(suggestions);
          });
        }
      });
    }

    if (destInput) {
      L.DomEvent.addListener(destInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          geocoder.geocode(destInput.value, (results) => {
            const suggestions = results.map(result => result.name);
            setDestSuggestions(suggestions);
          });
        }
      });
    }
  }, []);

  const handleStartingPointChange = (event) => {
    setStartingPoint(event.target.value);
  };

  const handleDestinationPointChange = (event) => {
    setDestinationPoint(event.target.value);
  };

  const handleStartingPointKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      geocoder.geocode(originalStartingPoint, (results) => {
        const suggestions = results.map(result => result.name);
        setStartSuggestions(suggestions);
      });
    }
  };

  const handleDestinationPointKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      geocoder.geocode(originalDestinationPoint, (results) => {
        const suggestions = results.map(result => result.name);
        setDestSuggestions(suggestions);
      });
    }
  };

  const handleStartSuggestionClick = (suggestion) => {
    geocoder.geocode(suggestion, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setFinalStartingPoint(suggestion);
        setOrigin({ lat: center.lat, lng: center.lng });
        setStartSuggestions([]);
      }
    });
  };

  const handleDestSuggestionClick = (suggestion) => {
    geocoder.geocode(suggestion, (results) => {
      if (results.length > 0) {
        const { center } = results[0];
        setFinalDestinationPoint(suggestion);
        setDestination({ lat: center.lat, lng: center.lng });
        setDestSuggestions([]);
      }
    });
  };

  return (
    <div>
      {/* Admin Navbar */}
      <nav className="navbar bg-light mb-4">
        <div className="container-fluid">
            {/* Title */}
            <span
                className="navbar-brand mb-0 h1"
                style={{ color: '#00b14f' }}
            >
                CrabForCustomer
            </span>

            {/* User Controls */}
            <div className="d-flex">
              <span style={{color: '#00b14f'}} className="me-2">
                  CHÀO MỪNG, <strong>{customerName.toUpperCase()}</strong>.
              </span>
              <button onClick={handleLogout} className={styles.logOut}>
                  ĐĂNG XUẤT
              </button>
            </div>
        </div>
      </nav>
      <div className="d-flex">
        <div
          id="sidebar"
          className="d-flex flex-column flex-shrink-0 px-3"
          style={{width: "33%"}}
        >
          <div className="flex-column w-100">
            <input
              type="text"
              className="leaflet-routing-geocoder-start form-control m-1"
              value={originalStartingPoint}
              onChange={handleStartingPointChange}
              onKeyDown={handleStartingPointKeyDown}
            />
            <ul>
              {startSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleStartSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
            <input
              type="text"
              className="leaflet-routing-geocoder-dest form-control m-1"
              value={originalDestinationPoint}
              onChange={handleDestinationPointChange}
              onKeyDown={handleDestinationPointKeyDown}
            />
            <ul>
              {destSuggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleDestSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
          {showPanel && (
          <div>
            {/* Panel content goes here */}
            <p style={{marginBottom: "5px"}}><strong>Từ:</strong> {StartingPoint}</p>
            <p style={{marginBottom: "5px"}}><strong>Đến:</strong> {DestinationPoint}</p>
            {distance && <p style={{marginBottom: "5px"}}>
              <strong>Khoảng Cách:</strong> {distance.toFixed(2)} km
            </p>}
            <p style={{marginBottom: "5px"}}>
              <strong>Giá:</strong> {distance ? (12000 * Math.min(2, distance) + Math.max(distance-2, 0) * 3400).toFixed(0) : 0} VND
            </p>
            {/* Add more information as needed */}
          </div>
        )}
        <button
          className={styles.find_driver_button}
          onClick={handleFindDriverClick}
          style={{width: "120px"}}
        >
          Tìm tài xế
        </button>
        </div>
        <div className="" style={{flexGrow: 1}}>
          <Map origin={origin} destination={destination}/>
        </div>
      </div>

      {isFindingDriver && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p style={{marginTop: "16px"}}>Đang tìm tài xế...</p>
          </div>
        </div>
      )}

      {driverFounded && (
        <div className={styles.modal}>
          <Found driverId={driverId} origin={origin} destination={destination} orderID = {orderID}/>
        </div>
      )}
    </div>
  );
};

export default Booking;
