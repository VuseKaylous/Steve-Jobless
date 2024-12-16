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
    const origin = { lat: parseFloat(olat), lng: parseFloat(olng) };
    const destination = { lat: parseFloat(dlat), lng: parseFloat(dlng) };
    
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
            <div className="" style={{flexGrow: 1}}>
                <Map origin={origin} destination={destination} />
            </div>
        </div>
    )
};

export default Location;