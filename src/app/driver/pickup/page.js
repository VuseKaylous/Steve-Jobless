'use client';

import { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const origin = {
  lat: 37.437041393899676,
  lng: -4.191635586788259
};

const destination = {
  lat: 37.440575591901045,
  lng: -4.231433159434073
}

const DriverPickup = () => {
  const [directions, setDirections] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  const address = "144 Xuan Thuy, Cau Giay, Ha Noi, Viet Nam"

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
    <div className="">
      <div id="sidebar" className="p-3 bg-light w-100" >
        <p className="h5 m-1"> Địa chỉ đón khách: {address} </p>
        <button className="m-1"> Xác nhận đón khách </button>
        <hr/>
      </div>
      <LoadScript googleMapsApiKey={process.env.API_GG}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={origin}
          zoom={10}
        >
          <Marker position={origin} />
          <Marker position={destination} />
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: 'DRIVING'
            }}
            callback={directionsCallback}
          />
          {directions && (
            <DirectionsRenderer
              options={{
                directions: directions
              }}
            />
          )}
        </GoogleMap>
        {travelTime && <p>Estimated travel time: {travelTime}</p>}
      </LoadScript>
    </div>
  );
};

export default DriverPickup;
