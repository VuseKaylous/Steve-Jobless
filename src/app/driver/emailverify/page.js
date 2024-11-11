'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function BusinessRegistration() {
    const [position, setPosition] = useState('');

    return (
        <div className="bg-light min-vh-100 p-4">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-md-11">
                        <div className="card shadow-sm">
                            <img
                                src="/image.png"
                                alt="Business banner"
                                className="card-img-top rounded-top"
                            />
                            <div className="card-body">
                                <h1 className="card-title h1 fw-bold text-dark mb-3">Crab</h1>
                                <p className="text-muted mb-4">
                                    Quản lý nhu cầu di chuyển, đồ ăn và giao hàng của bạn
                                </p>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div className="d-flex align-items-center">
                                        <div className="badge bg-secondary rounded-circle p-3 text-white">1</div>
                                        <span className="ms-2 text-muted">Thông tin cá nhân</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge bg-secondary rounded-circle p-3 text-white">2</div>
                                        <span className="ms-2 text-muted">Tải lên giấy tờ</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge bg-success rounded-circle p-3 text-white">3</div>
                                        <span className="ms-2 text-success fw-medium">Xác minh email</span>
                                    </div>
                                </div>
                                <div className="bg-light p-4 rounded">
                                    <h2 className="h4 fw-bold text-dark mb-4">Nhập mã OTP</h2>
                                    <p className="text-muted mb-3">
                                        Vui lòng kiểm tra hộp thư đến cùng như mục <span className="fw-medium">Thư rác</span> và <span className="fw-medium">Khuyến mãi</span> của bạn để xem mã OTP.
                                    </p>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nhập OTP"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-end gap-3">
                                        <button className="btn btn-light text-dark border">Trước</button>
                                        <button className="btn btn-success text-white">Tiếp theo</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
