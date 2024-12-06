"use client";

import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import styles from "../transaction/Transaction.module.css";

const AdminReports = () => {
    const navigation = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure this code runs only on the client side
        const isAuthenticated = !!localStorage.getItem('token'); // Replace with your authentication logic

        if (!isAuthenticated) {
            navigation.push('./'); // Redirect to the login page
        }
        }
    }, [navigation]);

    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [reports, setReports] = useState([]);
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        if (id) {
            // Fetch the report data using the id
            fetchData(id);
        }
    }, [id]);

    const fetchData = async (id) => {
        try {
            const response = await fetch(`/api/admin/reports?id=${id}`);
            const data = await response.json();
            setReports(data.reportData);
            setUserData(data.userData[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTransaction = () => {
        router.push('./transaction/');
    };

    const handleAccount = () => {
        router.push('./account/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        router.push('./');
    };

    return (
        <div>
            {/* Admin Navbar */}
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    {/* Title */}
                    <span 
                        className="navbar-brand mb-0 h1" 
                        style={{ color: '#00b14f' }}
                    >
                        CrabForAdministration
                    </span>

                    {/* User Controls */}
                    <div className="d-flex">
                        <span style={{color: '#00b14f'}} className="me-2">
                            CHÀO MỪNG, <strong>QUẢN TRỊ VIÊN</strong>.
                        </span>
                        <button onClick={handleLogout} className={styles.logOut}>
                            ĐĂNG XUẤT
                        </button>
                    </div>
                </div>
            </nav>

            <div className="container-fluid">
                <div className="row">
                    {/* Sidebar */}
                    <div className={styles.sidebar}>        
                        <button 
                            onClick={handleAccount} 
                            className={styles.section} 
                            style={{marginTop: "200px"}}
                        >
                            <div 
                                className={styles.section_title} 
                                style={{backgroundColor: "#00b14f", color: "white"}}
                            >
                                TÀI KHOẢN
                            </div>
                        </button>
                        <button 
                            onClick = {handleTransaction} 
                            className={styles.section} 
                            style={{marginTop: "10px"}}
                        >
                            <div className={styles.section_title}>GIAO DỊCH</div>
                        </button>
                    </div>

                    <div style={{ display: "inline-block", backgroundColor: "#fff", width: "85%" }}>
                        <div 
                            className="container bg-white" 
                            style={{ width: "80%", padding: "15px" }}
                        >
                            {/* Driver Info Section */}
                            <div 
                                className="card mb-4 mt-4" 
                                style={{ border: "1px solid #00b14f", borderRadius: "10px" }}
                            >
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div 
                                                className="mb-3" 
                                                style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}
                                            >
                                                <div className="text-muted mb-1">Họ và tên</div>
                                                <div className="h5 mb-0">{userData.name}</div>
                                            </div>
                                            <div 
                                                className="mb-3" 
                                                style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}
                                            >
                                                <div className="text-muted mb-1">Email</div>
                                                <div className="h5 mb-0">{userData.email}</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div 
                                                className="mb-3" 
                                                style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}
                                            >
                                                <div className="text-muted mb-1">ID</div>
                                                <div className="h5 mb-0">{userData.id}</div>
                                            </div>
                                            <div 
                                                className="mb-3" 
                                                style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}
                                            >
                                                <div className="text-muted mb-1">Số điện thoại</div>
                                                <div className="h5 mb-0">{userData.phone_number}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div style={{ maxHeight: "500px", overflowY: "scroll" }}>
                                <table 
                                    className="table table-bordered table-light table-striped" 
                                    style={{ tableLayout: "fixed", width: "100%" }}
                                >
                                    <thead>
                                        <tr>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{ color: "white", backgroundColor: "#00b14f" }}
                                            >
                                                MÃ BÁO CÁO
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{ color: "white", backgroundColor: "#00b14f" }}
                                            >
                                                MÃ KHÁCH HÀNG
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{ color: "white", backgroundColor: "#00b14f" }}
                                            >
                                                NỘI DUNG
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{ color: "white", backgroundColor: "#00b14f" }}
                                            >
                                                BỔ SUNG
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{ color: "white", backgroundColor: "#00b14f" }}
                                            >
                                                THỜI GIAN
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reports.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.id}</td>
                                                <td className="text-center">{item.customer_id}</td>
                                                <td className="text-center">{item.status}</td>
                                                <td className="text-center">{item.comment}</td>
                                                <td className="text-center">
                                                    {dayjs(item.created_at).format("DD/MM/YYYY HH:mm:ss")}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminReports;