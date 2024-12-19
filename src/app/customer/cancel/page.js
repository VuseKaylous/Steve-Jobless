"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cancellation = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const olat = searchParams.get('olat');
  const olng = searchParams.get('olng'); 
  const dlat = searchParams.get('dlat');
  const dlng = searchParams.get('dlng');
  const driverID = searchParams.get('driverID');
  const order_id = searchParams.get('orderID');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [distance, setDistance] = useState(0);

  const [customer, setCustomer] = useState(() => {
      const storedCustomer = localStorage.getItem('customer');
      return storedCustomer ? JSON.parse(storedCustomer) : {name: "", id: ""};
    });
  
    useEffect(() => {
      if (customer.id === "") {
        router.push('./login');
      }
    }, [customer]);

  const handleCancelOrder = async () => {
    try {
      const response = await fetch('/api/customer/cancel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order_id }),
      });

      if (response.ok) {
        router.push(`./payment?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&driverID=${driverID}&orderID=${order_id}&state=cancelled`);
      } else {
      }
    } catch (error) {
      console.error('Error cancelling order:', error);
    }
  };

  const handleLocation = () => {
    router.push(`./location?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&driverID=${driverID}&orderID=${order_id}`);
  };

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
    setDistance(calculateDistance(olat, olng, dlat, dlng));
  }, [olat, olng, dlat, dlng]);

  useEffect(() => {
    const fetchOrderInfo = async () => {
      try {
        const response = await fetch(`/api/customer/order-info?order_id=${order_id}`);
        const data = await response.json();
        setPickupLocation(data.pickup_location);
        setDropoffLocation(data.dropoff_location);
      } catch (error) {
        console.error('Error fetching order information:', error);
      }
    };

    if (order_id) {
      fetchOrderInfo();
    }
  }, [order_id]);

  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h5 className="card-title">BẠN MUỐN HỦY CHUYẾN?</h5>
        <div className="card-body">
          <div className="mb-3">
            <strong>Điểm Xuất Phát: </strong>
            <span id="start_pos">{pickupLocation}</span>
          </div>
          <div className="mb-3">
            <strong>Đích Đến: </strong>
            <span id="end_pos">{dropoffLocation}</span>
          </div>
          <div className="mb-3">
            <strong>Quãng Đường: </strong>
            <span id="end_pos">{distance.toFixed(2)} km</span>
          </div>
          
          <div className="mb-3">
            <strong>Phí Hủy Chuyến: </strong>
            <span id="fee">{(distance ? (12000 * Math.min(2, distance) + Math.max(distance-2, 0) * 3400).toFixed(0) : 0)/2} VND</span>
          </div>
          <div className="mb-3">
            <strong>Lý Do: </strong>
            <textarea 
              className="form-control mt-2" 
              placeholder="Lý do bạn hủy chuyến đi này?"
              rows="3"
            ></textarea>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button 
              className="btn btn-outline-danger me-3"
              onClick={handleCancelOrder}
            >
              Hủy Chuyến
            </button>
            
            <button 
              className="btn btn-outline-danger me-3"
              onClick={handleLocation}
            >
              Quay Lại
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;