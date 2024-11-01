import React from "react";
import styles from "./Account.module.css";

const Customer = [
    {name: "Nguyễn Văn A", username: "A_pro", user_id: "cus_1", role: "customer", report: ""},
    {name: "Lê Văn C", username: "C_vjp", user_id: "cus_2", role: "customer", report: ""},
    {name: "Vũ Văn E", username: "E_123", user_id: "cus_3", role: "customer", report: ""},
    {name: "Trần Văn F", username: "F_456", user_id: "cus_4", role: "customer", report: ""},
]

const Driver = [
    {name: "Nguyễn Văn B", username: "B_plus", user_id: "driver_1", role: "driver", report: "+2"},
    {name: "Đoàn Văn D", username: "D_cool", user_id: "driver_2", role: "driver", report: ""},
    {name: "Hà Văn O", username: "Osad", user_id: "driver_3", role: "driver", report: "+3"},
    {name: "Trần Văn G", username: "G_234", user_id: "driver_4", role: "driver", report: ""},
    {name: "Lê Văn H", username: "huhu", user_id: "driver_5", role: "driver", report: "+1"},
]


const AdminAccount = () => (
    <div>
        {/* Admin Navbar */}
        <nav className="navbar bg-light">
            <div className="container-fluid">
                {/* Title */}
                <span className="navbar-brand mb-0 h1" style={{ color: '#00b14f' }}>CrabForAdministration</span>

                {/* User Controls */}
                <div className="d-flex">
                    <span style={{color: '#00b14f'}} className="me-2">
                        WELCOME, <strong>ADMIN</strong>.
                    </span>
                    <div style={{cursor: "pointer", marginLeft: "20px", marginRight: "20px", display: "inline", color: "#00b14f"}}>
                        LOG OUT
                    </div>
                </div>
            </div>
        </nav>

        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <div className={styles.sidebar}>        
                    <div className={styles.section} style={{marginTop: "200px"}}>
                        <div className={styles.section_title} style={{backgroundColor: "#00b14f", color: "white"}}>ACCOUNT</div>
                    </div>
                    <div className={styles.section} style={{marginTop: "10px"}}>
                        <div className={styles.section_title}>TRANSACTION</div>
                    </div>
                </div>

                <div style={{display: "inline-block", backgroundColor: "#fff", width: "85%"}}>
                    <div className="container bg-white " style={{width: "80%", padding: "15px"}}>
                        <div className="input-group mb-3" style={{paddingTop: "50px"}}>
                            <input type="text" className="form-control" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-secondary" type="button">Search</button>
                        </div>
                        
                        <div style={{maxHeight: "200px", overflowY: "scroll"}}>
                            <table className="table table-bordered table-light table-striped" style={{tableLayout: "fixed", width: "100%"}}>
                                <thead>
                                    <tr>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>NAME</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>USER NAME</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>USER_ID</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>ROLE</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>REPORT</th>
                                        <th className={`text-center ${styles.sticky_header}`} scope="col" style={{color: "white", backgroundColor: "#00b14f"}}>DELETE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Customer.map((item) => (
                                        <tr key={item.user_id}>
                                            <td className="text-center">{item.name}</td>
                                            <td className="text-center">{item.username}</td>
                                            <td className="text-center">{item.user_id}</td>
                                            <td className="text-center">{item.role}</td>
                                            <td className="text-center">{item.report}</td>
                                            <td className="text-center"><input className="form-check-input" type="checkbox" /></td>
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
                                    {Driver.map((item) => (
                                        <tr key={item.user_id}>
                                            <td className="text-center">{item.name}</td>
                                            <td className="text-center">{item.username}</td>
                                            <td className="text-center">{item.user_id}</td>
                                            <td className="text-center">{item.role}</td>
                                            <td className="text-center">{item.report}</td>
                                            <td className="text-center"><input className="form-check-input" type="checkbox" /></td>
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

export default AdminAccount;