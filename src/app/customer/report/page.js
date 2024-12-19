'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from "react";

const ReportForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const olat = searchParams.get('olat') || 0.0;
    const olng = searchParams.get('olng') || 0.0; 
    const dlat = searchParams.get('dlat') || 0.0;
    const dlng = searchParams.get('dlng') || 0.0;
    const orderID = searchParams.get('orderID') || null;
    const driverID = searchParams.get('driverID') || null;

    const [customer, setCustomer] = useState(() => {
        const storedCustomer = localStorage.getItem('customer');
        return storedCustomer ? JSON.parse(storedCustomer) : {name: "", id: ""};
    });

    useEffect(() => {
        if (customer.id === "") {
            router.push('./login');
        }
    }, [customer]);

    const customerID = customer ? customer.id : null;


    const [showTextbox, setShowTextbox] = useState(false);
    const [reportType, setReportType] = useState('');
    const [comment, setDescription] = useState('');
    
    const handleContinue = async () => {
        try {
            const requestData = JSON.stringify({
                customerID: customerID,
                driverID: driverID,
                orderID: orderID,
                reportType: reportType,
                comment: comment || '',
            });
            const response = await fetch('/api/customer/report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: requestData,
            });

            if (response.ok) {
                router.push(`./location?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&orderID=${orderID}&driverID=${driverID}`);
            } else {
                console.error('Error inserting report');
            }
        } catch (error) {
            console.error('Error inserting report:', error);
        }
    };

    const handleCancel = () => {
        router.push(`./location?olat=${olat}&olng=${olng}&dlat=${dlat}&dlng=${dlng}&orderID=${orderID}&driverID=${driverID}`);
    };

    const handleCheckboxChange = (event) => {
        setShowTextbox(event.target.checked);
        setReportType(event.target.id);
    };

    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto mt-5" style={{ maxWidth: '28rem' }}>
                <h2 className="card-title h5 mb-4">Bạn cần báo cáo vấn đề gì?</h2>
                <form>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wrongRoute"
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="wrongRoute" className="form-check-label">
                                Tài xế đi sai đường
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="offensiveContent"
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="offensiveContent" className="form-check-label">
                                Tài xế có hành vi không tôn trọng
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="unsafetyDriving"
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                            />
                            <label 
                                htmlFor="unsafetyDriving" 
                                className="form-check-label"
                            >
                                Tài xế không tuân thủ luật giao thông
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="irrelevantInfo"
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                            />
                            <label 
                                htmlFor="irrelevantInfo" 
                                className="form-check-label"
                            >
                                Không phải tài xế đã đăng ký
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="wrongVehicle"
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                            />
                            <label 
                                htmlFor="wrongVehicle" 
                                className="form-check-label"
                            >
                                Phương tiện không giống như mô tả
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="otherIssue"
                                className="form-check-input"
                                onChange={handleCheckboxChange}
                            />
                            <label 
                                htmlFor="otherIssue" 
                                className="form-check-label"
                            >
                                Khác
                            </label>
                        </div>
                        {showTextbox && (
                            <div className="mt-3">
                                <textarea
                                    className="form-control"
                                    id="Other"
                                    rows="3"
                                    placeholder="Vui lòng nhập vấn đề của bạn"
                                    onChange={(e) => setDescription(e.target.value)} 
                                ></textarea>
                            </div>
                        )}
                    </div>
                    <div className="d-flex justify-content-between">
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            style={{width: '45%'}}
                            onClick={handleCancel}
                        >
                            Quay lại
                        </button>
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={handleContinue}
                            style={{width: '45%', color: 'white', backgroundColor: '#00b14f'}}
                        >
                            Tiếp tục
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;

