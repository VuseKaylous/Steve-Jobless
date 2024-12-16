'use client';
import React, { useState } from 'react';

const Payment = () => {
    // Khởi tạo các state để lưu thông tin về hành trình và thanh toán
    const [start, setStart] = useState('Loading...');
    const [end, setEnd] = useState('Loading...');
    const [total, setTotal] = useState('Loading...');
    const [error, setError] = useState(null);

    // Hàm gọi API khi tài xế bấm "Đã đến nơi"
    const handleInfo = async () => {
        try {
            const response = await fetch(`/api/customer/payment?order_id=1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Không thể cập nhật trạng thái chuyến đi');
            }

            const data = await response.json();

            // Cập nhật các giá trị từ API
            setStart(data.order.pickup_location);
            setEnd(data.order.dropoff_location);
            setTotal(data.payment.amount);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='container-fluid bg-light vh-100'>
            <div className='position-relative container bg-white border border-light border-2' style={{ top: "20px", padding: "3%", width: "40%" }}>
                <h1 className='text-center'>Thanh toán hóa đơn</h1>

                <div className='text-white border border-2 rounded-2' style={{ padding: "5px", backgroundColor: "#00b14f" }}>
                    <strong>Tóm tắt hành trình</strong>
                </div>

                {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi nếu có */}

                <div style={{ lineHeight: "40px" }}>
                    <div>
                        <span><strong>Điểm xuất phát: </strong></span>
                        <span id='start'>{start}</span>
                    </div>
                    <div>
                        <span><strong>Điểm đích: </strong></span>
                        <span id='end'>{end}</span>
                    </div>
                    <div>
                        <span><strong>Tổng tiền: </strong></span>
                        <span id="total">{total}</span>
                    </div>
                </div>

                {/* Nút tài xế bấm "Đã đến nơi" */}
                <div className="container text-center py-2 mt-4 d-flex justify-content-center">
                    <button
                        className="border border-2 px-5 rounded-2 text-white me-3"
                        style={{ padding: "5px", backgroundColor: "#00b14f" }}
                        onClick={handleInfo}
                    >
                        <strong>Lấy thông tin thanh toán</strong>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Payment;
