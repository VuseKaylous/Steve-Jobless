"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from "./Transaction.module.css";



const AdminTransaction = () => {
    const navigation = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure this code runs only on the client side
        const isAuthenticated = !!localStorage.getItem('token'); // Replace with your authentication logic

        if (!isAuthenticated) {
            navigation.push('./'); // Redirect to the login page
        }
        }
    }, [navigation]);

    const [SuccessfulTransaction, setSuccessfulTransactions] = useState([]);
    const [FailedTransaction, setFailedTransactions] = useState([]);

    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFailedTransactions, setFilteredFailedTransactions] = useState(FailedTransaction);
    const [filteredSuccessfulTransactions, setFilteredSuccessfulTransactions] = useState(SuccessfulTransaction);

    const handleAccount = () => {
        router.push('./account/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        router.push('./');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/transactions`);
                const data = await response.json();
                setSuccessfulTransactions(data.SuccessfulTransaction);
                setFailedTransactions(data.FailedTransaction);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (!searchQuery) { // This will check for null, undefined, and empty string
            setFilteredFailedTransactions(FailedTransaction);
            setFilteredSuccessfulTransactions(SuccessfulTransaction);
        } else {
            const searchQueryNumber = Number(searchQuery);
            setFilteredFailedTransactions(FailedTransaction.filter((transaction) => 
                transaction.id === searchQueryNumber));
            setFilteredSuccessfulTransactions(SuccessfulTransaction.filter((transaction) => 
                transaction.id === searchQueryNumber));
        }
    }, [searchQuery, FailedTransaction, SuccessfulTransaction]);

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
                            onClick = {handleAccount} 
                            className={styles.section} 
                            style={{marginTop: "200px"}}
                        >
                            <div className={styles.section_title}>TÀI KHOẢN</div>
                        </button>
                        <button className={styles.section} style={{marginTop: "10px"}}>
                            <div 
                                className={styles.section_title} 
                                style={{backgroundColor: "#00b14f", color: "white"}}
                            >
                                GIAO DỊCH
                            </div>
                        </button>
                    </div>

                    <div style={{display: "inline-block", backgroundColor: "#fff", width: "85%"}}>
                        <div 
                            className="container bg-white " 
                            style={{width: "80%", padding: "15px"}}
                        >
                            <div className="input-group mb-3" style={{paddingTop: "50px"}}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nhập mã giao dịch..." 
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e ? e.target.value : '')}
                                />
                                <button 
                                    className="btn btn-outline-secondary" 
                                    type="button"
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                            
                            <div style={{maxHeight: "200px", overflowY: "scroll"}}>
                                <table 
                                    className="table table-bordered table-light table-striped" 
                                    style={{tableLayout: "fixed", width: "100%"}}
                                >
                                    <thead>
                                    <tr>
                                        <th 
                                            className={`text-center ${styles.sticky_header}`} 
                                            scope="col" 
                                            style={{color: "white", backgroundColor: "#00b14f"}}
                                        >
                                            MÃ GIAO DỊCH
                                        </th>
                                        <th 
                                            className={`text-center ${styles.sticky_header}`} 
                                            scope="col" 
                                            style={{color: "white", backgroundColor: "#00b14f"}}
                                        >
                                            GIÁ TIỀN
                                        </th>
                                        <th 
                                            className={`text-center ${styles.sticky_header}`} 
                                            scope="col" 
                                            style={{color: "white", backgroundColor: "#00b14f"}}
                                        >
                                            TRẠNG THÁI
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFailedTransactions.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.id}</td>
                                                <td className="text-center">{item.amount}</td>
                                                <td className="text-center">{item.status}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            
                            {/* Dòng trắng để tách biệt */}
                            <div style={{ height: "20px", backgroundColor: "white" }}></div>

                            <div style={{ maxHeight: "180px", overflowY: "scroll" }}>
                                <table 
                                    className="table table-bordered table-light table-striped" 
                                    style={{tableLayout: "fixed", width: "100%"}}
                                >
                                    <thead>
                                    </thead>
                                    <tbody>
                                        {filteredSuccessfulTransactions.map((item) => (
                                            <tr key={item.id}>
                                                <td className="text-center">{item.id}</td>
                                                <td className="text-center">{item.amount}</td>
                                                <td className="text-center">{item.status}</td>
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

export default AdminTransaction;