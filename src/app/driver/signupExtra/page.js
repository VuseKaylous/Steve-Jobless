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
                                        <div className="badge bg-success rounded-circle p-3 text-white">2</div>
                                        <span className="ms-2 text-success fw-medium">Tải lên giấy tờ</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <div className="badge bg-secondary rounded-circle p-3 text-white">3</div>
                                        <span className="ms-2 text-muted">Xác minh email</span>
                                    </div>
                                </div>
                                <div className="bg-light p-4 rounded">
                                    <h2 className="h4 fw-bold text-dark mb-4">Tải lên giấy tờ</h2>

                                    {/* Upload section for Vehicle Registration */}
                                    <div className="mb-6">
                                        <h3 className="h5 fw-bold text-dark mb-2">Giấy đăng ký xe</h3>
                                        <p className="text-muted text-sm mb-4">
                                            Hỗ trợ tập tin: PDF, DOC, DOCX, PNG, JPEG | Kích thước tập tin tối đa: 2 MB
                                        </p>
                                        <div className="border border-dashed border-secondary p-4 rounded mb-4">
                                            <label className="btn btn-success text-white px-4 py-2 rounded cursor-pointer d-inline-flex align-items-center">
                                                <span>Tải lên</span>
                                                <input type="file" className="d-none" accept=".pdf,.doc,.docx,.png,.jpeg" />
                                            </label>
                                        </div>
                                    </div>

                                    {/* Upload section for Driver's License */}
                                    <div className="mb-6">
                                        <h3 className="h5 fw-bold text-dark mb-2">Giấy phép lái xe</h3>
                                        <p className="text-muted text-sm mb-4">
                                            Hỗ trợ tập tin: PDF, DOC, DOCX, PNG, JPEG | Kích thước tập tin tối đa: 2 MB
                                        </p>
                                        <div className="border border-dashed border-secondary p-4 rounded mb-4">
                                            <label className="btn btn-success text-white px-4 py-2 rounded cursor-pointer d-inline-flex align-items-center">
                                                <span>Tải lên</span>
                                                <input type="file" className="d-none" accept=".pdf,.doc,.docx,.png,.jpeg" />
                                            </label>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end gap-3">
                                        <button className="btn btn-secondary">Trước</button>
                                        <button className="btn btn-success">Tiếp theo</button>
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
