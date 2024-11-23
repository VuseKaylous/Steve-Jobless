import React from "react";
import styles from "../transaction/Transaction.module.css";

const PendingTransaction = [
    { id: "1", cus_id: "cus_1", reportType: "Bad attitude", customerFeedback: "", state: "pending" },
    { id: "5", cus_id: "cus_9", reportType: "Vehicle problem", customerFeedback: "", state: "pending" },
];

const ResolvedTransaction = [
    { id: "2", cus_id: "cus_2", reportType: "Other", customerFeedback: "The driver is ex-lover", state: "Resolved" },
    { id: "3", cus_id: "cus_4", reportType: "Reckless driving", customerFeedback: "", state: "Resolved" },
    { id: "4", cus_id: "cus_3", reportType: "High fee", customerFeedback: "", state: "Resolved" },
];

const AdminTransaction = () => (
    <div>
        {/* Admin Navbar */}
        <nav className="navbar bg-light">
            <div className="container-fluid">
                {/* Title */}
                <span className="navbar-brand mb-0 h1" style={{ color: '#00b14f' }}>CrabForAdministration</span>

                {/* User Controls */}
                <div className="d-flex">
                    <span style={{ color: '#00b14f' }} className="me-2">
                        CHÀO MỪNG, <strong>QUẢN TRỊ VIÊN</strong>.
                    </span>
                    <div style={{ cursor: "pointer", marginLeft: "20px", marginRight: "20px", display: "inline", color: "#00b14f" }}>
                        ĐĂNG XUẤT
                    </div>
                </div>
            </div>
        </nav>

        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.section} style={{ marginTop: "200px" }}>
                        <div className={styles.section_title}>TÀI KHOẢN</div>
                    </div>
                    <div className={styles.section} style={{ marginTop: "10px" }}>
                        <div className={styles.section_title} style={{ backgroundColor: "#00b14f", color: "white" }}>GIAO DỊCH</div>
                    </div>
                </div>

                <div style={{ display: "inline-block", backgroundColor: "#fff", width: "85%" }}>
                    <div className="container bg-white" style={{ width: "80%", padding: "15px" }}>
                        {/* Driver Info Section */}
                        <div className="card mb-4 mt-4" style={{ border: "1px solid #00b14f", borderRadius: "10px" }}>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3" style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}>
                                            <div className="text-muted mb-1">Name</div>
                                            <div className="h5 mb-0">Nguyễn Văn B</div>
                                        </div>
                                        <div className="mb-3" style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}>
                                            <div className="text-muted mb-1">Username</div>
                                            <div className="h5 mb-0">B_plus</div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3" style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}>
                                            <div className="text-muted mb-1">Driver_ID</div>
                                            <div className="h5 mb-0">driver_1</div>
                                        </div>
                                        <div className="mb-3" style={{ borderLeft: "4px solid #00b14f", paddingLeft: "15px" }}>
                                            <div className="text-muted mb-1">Report List</div>
                                            <div className="h5 mb-0">Active Reports</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>

                        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                            <table className="table table-bordered table-light table-striped" style={{ tableLayout: "fixed", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>Cus_ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>Report Type</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>Customer Feedback</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {PendingTransaction.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center">{item.id}</td>
                                            <td className="text-center">{item.cus_id}</td>
                                            <td className="text-center">{item.reportType}</td>
                                            <td className="text-center">{item.customerFeedback}</td>
                                            <td className="text-center">{item.state}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ height: "20px", backgroundColor: "white" }}></div>

                        <div style={{ maxHeight: "180px", overflowY: "scroll" }}>
                            <table className="table table-bordered table-light table-striped" style={{ tableLayout: "fixed", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>Cus_ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>Report Type</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>Customer Feedback</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>State</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ResolvedTransaction.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-center">{item.id}</td>
                                            <td className="text-center">{item.cus_id}</td>
                                            <td className="text-center">{item.reportType}</td>
                                            <td className="text-center">{item.customerFeedback}</td>
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
);

export default AdminTransaction;