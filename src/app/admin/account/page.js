"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./Account.module.css";

const AdminAccount = () => {
    const navigation = useRouter();
    useEffect(() => {
        if (typeof window !== 'undefined') { // Ensure this code runs only on the client side
        const isAuthenticated = !!localStorage.getItem('token'); // Replace with your authentication logic

        if (!isAuthenticated) {
            navigation.push('./'); // Redirect to the login page
        }
        }
    }, [navigation]);

    const [customers, setCustomers] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [numReports, setNumReports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/admin/accounts`);
                const data = await response.json();
                setCustomers(data.customersData);
                setDrivers(data.driversData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (drivers.length > 0) {
            drivers.forEach((driver, index) => {
                fetchNum(driver.id, index);
            });
        }
    }, [drivers]);
    
    const fetchNum = async (id, index) => {
        try {
            const response = await fetch(`/api/admin/reports?id=${id}`);
            const data = await response.json();
            setNumReports(prevNumReports => {
                const newNumReports = [...prevNumReports];
                newNumReports[index] = data.reportData.length;
                return newNumReports;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const router = useRouter();

    const handleTransaction = () => {
        router.push('./transaction/');
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        router.push('./');
    };

    const handleReport = (id) => {
        router.push(`./report?id=${id}`);
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [filteredDrivers, setFilteredDrivers] = useState(drivers);

    useEffect(() => {
        setFilteredCustomers(customers.filter((customer) => customer.email.toLowerCase().includes(searchQuery.toLowerCase())));
        setFilteredDrivers(drivers.filter((driver) => driver.email.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [searchQuery, customers, drivers]);


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
                        <button className={styles.section} style={{marginTop: "200px"}}>
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

                    <div 
                        style={{display: "inline-block", backgroundColor: "#fff", width: "85%"}}
                    >
                        <div 
                            className="container bg-white " 
                            style={{width: "80%", padding: "15px"}}
                        >
                            <div 
                                className="input-group mb-3" 
                                style={{paddingTop: "50px"}}
                            >
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nhập địa chỉ email..." 
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="btn btn-outline-secondary" type="button">Tìm kiếm</button>
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
                                                HỌ VÀ TÊN
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{color: "white", backgroundColor: "#00b14f"}}
                                            >
                                                ID
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{color: "white", backgroundColor: "#00b14f"}}
                                            >
                                                EMAIL
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{color: "white", backgroundColor: "#00b14f"}}
                                            >
                                                SỐ ĐIỆN THOẠI
                                            </th>
                                            <th 
                                                className={`text-center ${styles.sticky_header}`} 
                                                scope="col" 
                                                style={{color: "white", backgroundColor: "#00b14f"}}
                                            >
                                                BÁO CÁO
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCustomers.map((customer) => (
                                            <tr key={customer.user_id}>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {customer.name}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {customer.id}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {customer.email}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {customer.phone_number}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {customer.report}
                                                </td>
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
                                        {filteredDrivers.map((driver) => (
                                            <tr key={driver.id}>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {driver.name}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    <button 
                                                        onClick={() => handleReport(driver.id)} 
                                                        className={styles.Report}
                                                    >
                                                        {driver.id}
                                                    </button>
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {driver.email}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    {driver.phone_number}
                                                </td>
                                                <td 
                                                    className="text-center"
                                                    style={{whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow: "ellipsis"}}
                                                >
                                                    +{numReports[driver.id-1]}
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

export default AdminAccount;