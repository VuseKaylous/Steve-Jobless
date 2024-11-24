"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./Account.module.css";

const AdminAccount = () => {
    const [customers, setCustomers] = useState([
        {name: "Nguyễn Văn A", gmail: "A@example.com", user_id: "1", phone: "0xx.xxx.xxxx", report: ""},
        {name: "Lê Văn C", gmail: "C@example.com", user_id: "2", phone: "0xx.xxx.xxxx", report: ""},
        {name: "Vũ Văn E", gmail: "E@example.com", user_id: "3", phone: "0xx.xxx.xxxx", report: ""},
        {name: "Trần Văn F", gmail: "F@example.com", user_id: "4", phone: "0xx.xxx.xxxx", report: ""},
    ]);

    const [drivers, setDrivers] = useState([
        {name: "Nguyễn Văn B", gmail: "B@example.com", user_id: "1", phone: "0xx.xxx.xxxx", report: "+2"},
        {name: "Đoàn Văn D", gmail: "D@example.com", user_id: "2", phone: "0xx.xxx.xxxx", report: ""},
        {name: "Hà Văn O", gmail: "O@example.com", user_id: "3", phone: "0xx.xxx.xxxx", report: "+3"},
        {name: "Trần Văn G", gmail: "G@example.com", user_id: "4", phone: "0xx.xxx.xxxx", report: ""},
        {name: "Lê Văn H", gmail: "H@example.com", user_id: "5", phone: "0xx.xxx.xxxx", report: "+1"},
    ]);
    

    const router = useRouter();

    const handleTransaction = () => {
        // Perform any logout logic here
        // Then navigate to the report page
        router.push('./transaction/');
    };

    const handleLogout = () => {
        // Perform any logout logic here
        // Then navigate to the login page
        router.push('./login/');
    };

    const handleCheckboxChange = (id, type) => {
        if (type === 'customer') {
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.user_id === id ? { ...customer, isChecked: !customer.isChecked } : customer
                )
            );
        } else if (type === 'driver') {
            setDrivers((prevDrivers) =>
                prevDrivers.map((driver) =>
                    driver.user_id === id ? { ...driver, isChecked: !driver.isChecked } : driver
                )
            );
        }
    };

    const [isAnyChecked, setIsAnyChecked] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [filteredDrivers, setFilteredDrivers] = useState(drivers);

    useEffect(() => {
        const anyChecked = customers.some((customer) => customer.isChecked) || drivers.some((driver) => driver.isChecked);
        setIsAnyChecked(anyChecked);
    }, [customers, drivers]);

    useEffect(() => {
        setFilteredCustomers(customers.filter((customer) => customer.gmail.toLowerCase().includes(searchQuery.toLowerCase())));
        setFilteredDrivers(drivers.filter((driver) => driver.gmail.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [searchQuery, customers, drivers]);

    const handleDelete = () => {
        setCustomers((prevCustomers) => prevCustomers.filter((customer) => !customer.isChecked));
        setDrivers((prevDrivers) => prevDrivers.filter((driver) => !driver.isChecked));
    };

    return (
        <div>
            {/* Admin Navbar */}
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    {/* Title */}
                    <span className="navbar-brand mb-0 h1" style={{ color: '#00b14f' }}>CrabForAdministration</span>

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
                            <div className={styles.section_title} style={{backgroundColor: "#00b14f", color: "white"}}>TÀI KHOẢN</div>
                        </button>
                        <button onClick = {handleTransaction} className={styles.section} style={{marginTop: "10px"}}>
                            <div className={styles.section_title}>GIAO DỊCH</div>
                        </button>
                    </div>

                    <div style={{display: "inline-block", backgroundColor: "#fff", width: "85%"}}>
                        <div className="container bg-white " style={{width: "80%", padding: "15px"}}>
                            <div className="input-group mb-3" style={{paddingTop: "50px"}}>
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
                                <table className="table table-bordered table-light table-striped" style={{tableLayout: "fixed", width: "100%"}}>
                                    <thead>
                                        <tr>
                                            <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>HỌ VÀ TÊN</th>
                                            <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>ID</th>
                                            <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>EMAIL</th>
                                            <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>SỐ ĐIỆN THOẠI</th>
                                            <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>BÁO CÁO</th>
                                            <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>XÓA</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCustomers.map((customer) => (
                                            <tr key={customer.user_id}>
                                                <td className="text-center">{customer.name}</td>
                                                <td className="text-center">{customer.user_id}</td>
                                                <td className="text-center">{customer.gmail}</td>
                                                <td className="text-center">{customer.phone}</td>
                                                <td className="text-center">{customer.report}</td>
                                                <td className="text-center">
                                                    <input className="form-check-input"
                                                        type="checkbox"
                                                        checked={customer.isChecked}
                                                        onChange={() => handleCheckboxChange(customer.user_id, 'customer')}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ height: "20px", backgroundColor: "white" }}></div> {/* Dòng trắng để tách biệt */}

                            <div style={{ maxHeight: "180px", overflowY: "scroll" }}>
                                <table className="table table-bordered table-light table-striped" style={{tableLayout: "fixed", width: "100%"}}>
                                    <thead>
                                    </thead>
                                    <tbody>
                                        {filteredDrivers.map((driver) => (
                                            <tr key={driver.user_id}>
                                                <td className="text-center">{driver.name}</td>
                                                <td className="text-center">{driver.user_id}</td>
                                                <td className="text-center">{driver.gmail}</td>
                                                <td className="text-center">{driver.phone}</td>
                                                <td className="text-center">{driver.report}</td>
                                                <td className="text-center">
                                                    <input className="form-check-input"
                                                        type="checkbox"
                                                        checked={driver.isChecked}
                                                        onChange={() => handleCheckboxChange(driver.user_id, 'driver')}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {isAnyChecked && (
                                <button
                                    style={{
                                        marginTop: '10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        padding: '10px 20px',
                                        border: 'none',
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleDelete}
                                >
                                    Xóa
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminAccount;