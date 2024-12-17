'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Payment = () => {
    const searchParams = useSearchParams();
    const state = searchParams.get('state');
    const order_id = searchParams.get('orderID');
    const olat = searchParams.get('olat');
    const olng = searchParams.get('olng'); 
    const dlat = searchParams.get('dlat');
    const dlng = searchParams.get('dlng');
    const driverID = searchParams.get('driverID');
    const [start, setPickupLocation] = useState('');
    const [end, setDropoffLocation] = useState('');
    const [distance, setDistance] = useState(0);

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

    return (
        <div className='container-fluid bg-light vh-100'>
            <div className='position-relative container bg-white border border-light border-2' style={{ top: "20px", padding: "3%", width: "40%" }}>
                <h1 className='text-center'>Thanh toán hóa đơn</h1>

                {/* <div className='text-white border border-2 rounded-2 text-center' style={{ padding: "5px", backgroundColor: "#00b14f" }}>
                    <strong>Tóm tắt hành trình</strong>
                </div> */}

                <div style={{ lineHeight: "30px" }}>
                    <div>
                        <span><strong>Điểm xuất phát: </strong></span>
                        <span id='start'>{start}</span>
                    </div>
                    <div>
                        <span><strong>Điểm đích: </strong></span>
                        <span id='end'>{end}</span>
                    </div>
                    <div>
                        <span><strong>Khoảng cách: </strong></span>
                        <span id='length'>{distance.toFixed(2)} km</span>
                    </div>
                    <div>
                        <span><strong>Giá tiền: </strong></span>
                        <span id="fee">{(distance ? (12000 * Math.min(2, distance) + Math.max(distance-2, 0) * 3400).toFixed(0) : 0) / (state === "cancelled" ? 2 : 1)} VND</span>
                    </div>
                </div>

                {/* Notification Box */}
                <div className="alert alert-warning text-center" role="alert">
                    Vui lòng trả phí cho tài xế
                </div>

            </div>
        </div>
    );
};

export default Payment;
