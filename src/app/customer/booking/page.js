"use client";

// import L from 'leaflet';
import 'leaflet-control-geocoder';
import { useRouter } from 'next/navigation';
import styles from "./page.module.css"
import dynamic from "next/dynamic";
const Map = dynamic(() => import('../../../components/Map'), { ssr: false});
// import Map from "../../../components/Map.js";
import Found from './found';
import React, { useState, useEffect } from 'react';
import { FindCost, calculateDistance, geocodeAddress, geocodeAddressAll } from '@/components/Utils';

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
  // const geocoder = L.Control.Geocoder.nominatim();
  const [showPanel, setShowPanel] = useState(false);
  const [distance, setDistance] = useState(null);
  const [isFindingDriver, setIsFindingDriver] = useState(false);
  const [driverFounded, setdriverFounded] = useState(false);
  const [driverId, setDriverId] = useState(null);
  const [orderID, setOrderID] = useState(null);

  const [customer, setCustomer] = useState(() => {
    const storedCustomer = localStorage.getItem('customer');
    return storedCustomer ? JSON.parse(storedCustomer) : {name: "", id: ""};
  });

  useEffect(() => {
    if (customer.id === "") {
      router.push('./login');
    }
  }, [customer]);

  const handleLogout = () => {
    localStorage.removeItem('customer'); // Remove the token from localStorage
    router.push('./login');
  };

  const handleFindDriverClick = async () => {
    if (StartingPoint && DestinationPoint) {
      setIsFindingDriver(true);
      const requestData = JSON.stringify({
        customer_id: customer.id,
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


  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window) return;
    const startInput = document.querySelector('.leaflet-routing-geocoder-start');
    const destInput = document.querySelector('.leaflet-routing-geocoder-dest');

    if (startInput) {
      L.DomEvent.addListener(startInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          // geocoder.geocode(startInput.value, (results) => {
          //   const suggestions = results.map(result => result.name);
          //   setStartSuggestions(suggestions);
          // });
          geocodeAddressAll(startInput.value, (results) => {
            setStartSuggestions(results);
          });
        }
      });
    }

    if (destInput) {
      L.DomEvent.addListener(destInput, 'keydown', (e) => {
        if (e.key === 'Enter') {
          // geocoder.geocode(destInput.value, (results) => {
          //   const suggestions = results.map(result => result.name);
          //   setDestSuggestions(suggestions);
          // });
          geocodeAddressAll(destInput.value, (results) => {
            setDestSuggestions(results);
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
      // geocoder.geocode(originalStartingPoint, (results) => {
      //   const suggestions = results.map(result => result.name);
      //   setStartSuggestions(suggestions);
      // });
      geocodeAddressAll(startInput.value, (results) => {
        setStartSuggestions(results);
      })
    }
  };

  const handleDestinationPointKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      // geocoder.geocode(originalDestinationPoint, (results) => {
      //   const suggestions = results.map(result => result.name);
      //   setDestSuggestions(suggestions);
      // });
      geocodeAddressAll(destInput.value, (results) => {
        setDestSuggestions(results);
      });
    }
  };

  const handleStartSuggestionClick = (suggestion) => {
    // geocoder.geocode(suggestion, (results) => {
    //   if (results.length > 0) {
    //     const { center } = results[0];
    //     setFinalStartingPoint(suggestion);
    //     setOrigin({ lat: center.lat, lng: center.lng });
    //     setStartSuggestions([]);
    //   }
    // });
    geocodeAddress(suggestion, (results) => {
      setFinalStartingPoint(suggestion);
      setStartSuggestions([]);
      setOrigin(results);
    })
  };

  const handleDestSuggestionClick = (suggestion) => {
    // geocoder.geocode(suggestion, (results) => {
    //   if (results.length > 0) {
    //     const { center } = results[0];
    //     setFinalDestinationPoint(suggestion);
    //     setDestination({ lat: center.lat, lng: center.lng });
    //     setDestSuggestions([]);
    //   }
    // });
    geocodeAddress(suggestion, (results) => {
      setFinalDestinationPoint(suggestion);
      setDestSuggestions([]);
      setDestination(results);
    })
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
                  CHÀO MỪNG, <strong>{customer.name.toUpperCase()}</strong>.
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
              <strong>Giá:</strong> {distance ? FindCost(distance) : 0} VND
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
