'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

const ReportForm = () => {
    return (
        <div className="container mt-5">
            <div className="card p-4 mx-auto" style={{ maxWidth: '28rem' }}>
                <h2 className="card-title h5 mb-4">Tại sao bạn lại báo cáo vấn đề này?</h2>
                <form>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="offensiveContent"
                                className="form-check-input"
                            />
                            <label htmlFor="offensiveContent" className="form-check-label">
                                Nội dung thù địch
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="sexualContent"
                                className="form-check-input"
                            />
                            <label htmlFor="sexualContent" className="form-check-label">
                                Nội dung xúc phạm hoặc khiêu dâm
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="spamContent"
                                className="form-check-input"
                            />
                            <label htmlFor="spamContent" className="form-check-label">
                                Thư rác hoặc quảng cáo
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="irrelevantInfo"
                                className="form-check-input"
                            />
                            <label htmlFor="irrelevantInfo" className="form-check-label">
                                Thông tin không liên quan hoặc sai lệch
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="personalInfo"
                                className="form-check-input"
                            />
                            <label htmlFor="personalInfo" className="form-check-label">
                                Chứa thông tin cá nhân
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                type="checkbox"
                                id="driverComments"
                                className="form-check-input"
                            />
                            <label htmlFor="driverComments" className="form-check-label">
                                Nhận xét là về tài xế
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-success w-100"
                    >
                        Tiếp tục
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ReportForm;

