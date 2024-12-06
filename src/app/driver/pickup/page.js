'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../../../components/Map'), { ssr: false });

const containerStyle = {
  width: '100%',
  height: '400px'
};

const origin = {
  lat: 21.029268524281907,
  lng: 105.77800700979684
};

const destination = {
  lat: 21.037961377894163,
  lng: 105.7834146294285
}

const DriverPickup = () => {
  const [isClient, setIsClient] = useState(false)
  const [directions, setDirections] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  useEffect(() => {
    setIsClient(true)
  }, [])

  const address = "144 Xuan Thuy, Cau Giay, Ha Noi, Viet Nam";

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };

  return (
    <div className="d-flex flex-column">
      <div id="sidebar" className="p-3 bg-light w-100">
        <p className="h5 m-1">Địa chỉ đón khách: {address}</p>
        <button className="btn btn-primary m-1">Xác nhận đón khách</button>
        <hr />
      </div>
      <div className="flex-grow-1">
        {isClient && typeof window !== 'undefined' ? (
          <Map origin={origin} destination={destination} />
        ) : (
          <p>Đang tải bản đồ...</p>
        )}
      </div>
    </div>
  );
};

export default DriverPickup;
