"use client";

import React, { useEffect } from 'react';
import styles from "./page.module.css";
import { useRouter, useSearchParams } from 'next/navigation';
import Map from "../../../components/Map.js";


const Location = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const customer = JSON.parse(localStorage.getItem('customer'));
    const olat = searchParams.get('olat');
    const olng = searchParams.get('olng'); 
    const dlat = searchParams.get('dlat');
    const dlng = searchParams.get('dlng');
    const driverID = searchParams.get('driverID');
    const order_id = searchParams.get('orderID');
    const origin = { lat: parseFloat(olat), lng: parseFloat(olng) };
    const destination = { lat: parseFloat(dlat), lng: parseFloat(dlng) };
    
    useEffect(() => {
        if (!customer) {
            router.push('./login');
        }

        const checkOrderStatus = async () => {
            try {
                const response = await fetch(`/api/customer/status?order_id=${order_id}`);
                const data = await response.json();

                if (data.status === 'hoàn thành') {
                    router.push(`./payment?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&orderID=${order_id}&state=completed`);
                }
            } catch (error) {
                console.error('Error checking order status:', error);
            }
        };

        const intervalId = setInterval(checkOrderStatus, 5000);
        return () => clearInterval(intervalId);
    }, [router]);

    const handleReport = () => {
        router.push(`./report?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&orderID=${order_id}&driverID=${driverID}`);
    };

    const handleCancel = () => {
        router.push(`./cancel?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&driverID=${driverID}&orderID=${order_id}`);
    };

    return (
        <div>
            <div className="" style={{flexGrow: 1}}>
                <Map origin={origin} destination={destination} />
            </div>

            {/* Buttons at the bottom right */}
            <div className={styles.bottomRightButtons}>
                <button 
                    className="btn btn-danger me-2"
                    onClick={handleCancel}
                >
                    Hủy chuyến
                </button>
                <button 
                    className="btn btn-warning"
                    onClick={handleReport}
                >
                    Báo cáo
                </button>
            </div>
        </div>
    )
};

export default Location;