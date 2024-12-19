"use client";

import React, { Suspense, useEffect, useState } from 'react';
import styles from "./page.module.css";
import { useRouter, useSearchParams } from 'next/navigation';
// import Map from "../../../components/Map.js";
import dynamic from "next/dynamic";
const Map = dynamic(() => import('../../../components/Map'), { ssr: false});


const Location = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const olat = searchParams.get('olat') || 0.0;
    const olng = searchParams.get('olng') || 0.0; 
    const dlat = searchParams.get('dlat') || 0.0;
    const dlng = searchParams.get('dlng') || 0.0;
    const driverID = searchParams.get('driverID') || 0;
    const order_id = searchParams.get('orderID') || 0;
    const origin = { lat: parseFloat(olat), lng: parseFloat(olng) };
    const destination = { lat: parseFloat(dlat), lng: parseFloat(dlng) };

    // const [customer, setCustomer] = useState(() => {
    //     const storedCustomer = localStorage.getItem('customer');
    //     return storedCustomer ? JSON.parse(storedCustomer) : {name: "", id: ""};
    // });

    const [customer, setCustomer] = useState({name: "", id: ""});
    
    useEffect(() => {
        if (customer.id === "") {
            router.push('./login');
        }

        const storedCustomer = localStorage.getItem('customer');
        if (storedCustomer) {
            setCustomer(JSON.parse(storedCustomer));
        }

        const checkOrderStatus = async () => {
            try {
                const response = await fetch(`/api/customer/status?order_id=${order_id}`);
                const data = await response.json();

                if (data.status === 'đã hoàn thành') {
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

const CustomerLocation = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Location></Location>
        </Suspense>
    )
}

export default CustomerLocation;