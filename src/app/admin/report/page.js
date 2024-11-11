import React from "react";
import styles from "../transaction/Transaction.module.css";

const FailedTransaction = [
    { id: "t_5", cus_id: "cus_1", reportType: "Payment Failure", customerFeedback: "Payment not processed.", state: "failed" },
    { id: "t_7", cus_id: "cus_9", reportType: "Service Issue", customerFeedback: "Driver was late.", state: "failed" },
    { id: "t_9", cus_id: "cus_3", reportType: "Cancellation", customerFeedback: "Order cancelled by user.", state: "failed" },
    { id: "t_11", cus_id: "cus_10", reportType: "Refund Request", customerFeedback: "Requesting refund for the trip.", state: "failed" },
];

const SuccessfulTransaction = [
    { id: "t_1", cus_id: "cus_2", reportType: "Completed", customerFeedback: "Great service!", state: "finished" },
    { id: "t_2", cus_id: "cus_4", reportType: "Completed", customerFeedback: "Everything was perfect.", state: "finished" },
    { id: "t_3", cus_id: "cus_3", reportType: "Completed", customerFeedback: "Driver was very helpful.", state: "finished" },
    { id: "t_6", cus_id: "cus_5", reportType: "Completed", customerFeedback: "On time and safe!", state: "finished" },
    { id: "t_8", cus_id: "cus_12", reportType: "Completed", customerFeedback: "Will use again.", state: "finished" },
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
                        <div className="input-group mb-3" style={{ paddingTop: "50px" }}>
                            <input type="text" className="form-control" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>

                        <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                            <table className="table table-bordered table-light table-striped" style={{ tableLayout: "fixed", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>CUS_ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>ReportType</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>CustomerFeedback</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>STATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FailedTransaction.map((item) => (
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

                        <div style={{ height: "20px", backgroundColor: "white" }}></div> {/* White line to separate */}

                        <div style={{ maxHeight: "180px", overflowY: "scroll" }}>
                            <table className="table table-bordered table-light table-striped" style={{ tableLayout: "fixed", width: "100%" }}>
                                <thead>
                                    <tr>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>CUS_ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>ReportType</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>CustomerFeedback</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{ color: "white", backgroundColor: "#00b14f" }}>STATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {SuccessfulTransaction.map((item) => (
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
