"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import styles from "./Transaction.module.css";

const FailedTransaction = [
    {trans_id: "t_5", cus_id: "1", driver_id: "2", information: "37.000 VNĐ", state: "lỗi"},
    {trans_id: "t_7", cus_id: "9", driver_id: "5", information: "", state: "lỗi"},
    {trans_id: "t_9", cus_id: "3", driver_id: "4", information: "", state: "lỗi"},
    {trans_id: "t_11", cus_id: "10", driver_id: "7", information: "", state: "lỗi"},
]

const SuccessfulTransaction = [
    {trans_id: "t_1", cus_id: "2", driver_id: "1", information: "", state: "hoàn thành"},
    {trans_id: "t_2", cus_id: "4", driver_id: "7", information: "", state: "hoàn thành"},
    {trans_id: "t_3", cus_id: "3", driver_id: "3", information: "", state: "hoàn thành"},
    {trans_id: "t_6", cus_id: "5", driver_id: "4", information: "", state: "hoàn thành"},
    {trans_id: "t_8", cus_id: "12", driver_id: "6", information: "", state: "hoàn thành"},
]


const AdminTransaction = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFailedTransactions, setFilteredFailedTransactions] = useState(FailedTransaction);
    const [filteredSuccessfulTransactions, setFilteredSuccessfulTransactions] = useState(SuccessfulTransaction);

    const handleAccount = () => {
        // Perform any logout logic here
        // Then navigate to the report page
        router.push('./account/');
    };

    const handleLogout = () => {
        // Perform any logout logic here
        // Then navigate to the login page
        router.push('./login/');
    };

    useEffect(() => {
        setFilteredFailedTransactions(FailedTransaction.filter((transaction) => transaction.trans_id.toLowerCase().includes(searchQuery.toLowerCase())));
        setFilteredSuccessfulTransactions(SuccessfulTransaction.filter((transaction) => transaction.trans_id.toLowerCase().includes(searchQuery.toLowerCase())));
    }, [searchQuery]);

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
                        <button onClick = {handleAccount} className={styles.section} style={{marginTop: "200px"}}>
                            <div className={styles.section_title}>TÀI KHOẢN</div>
                        </button>
                        <button className={styles.section} style={{marginTop: "10px"}}>
                            <div className={styles.section_title} style={{backgroundColor: "#00b14f", color: "white"}}>GIAO DỊCH</div>
                        </button>
                    </div>

                    <div style={{display: "inline-block", backgroundColor: "#fff", width: "85%"}}>
                        <div className="container bg-white " style={{width: "80%", padding: "15px"}}>
                            <div className="input-group mb-3" style={{paddingTop: "50px"}}>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Nhập mã giao dịch..." 
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
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>MÃ GIAO DỊCH</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>MÃ KHÁCH HÀNG</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>MÃ TÀI XẾ</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>GIÁ TIỀN</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>TRẠNG THÁI</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFailedTransactions.map((item) => (
                                            <tr key={item.trans_id}>
                                                <td className="text-center">{item.trans_id}</td>
                                                <td className="text-center">{item.cus_id}</td>
                                                <td className="text-center">{item.driver_id}</td>
                                                <td className="text-center">{item.information}</td>
                                                <td className="text-center">{item.state}</td>
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
                                        {filteredSuccessfulTransactions.map((item) => (
                                            <tr key={item.trans_id}>
                                                <td className="text-center">{item.trans_id}</td>
                                                <td className="text-center">{item.cus_id}</td>
                                                <td className="text-center">{item.driver_id}</td>
                                                <td className="text-center">{item.information}</td>
                                                <td className="text-center">{item.state}</td>
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