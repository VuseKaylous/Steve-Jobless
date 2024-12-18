'use client';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Payment = () => {
    const [paymentStatus, setPaymentStatus] = useState(null); // Theo dõi trạng thái thanh toán

    const handlePayment = async () => {
        try {
            const response = await fetch('/api/driver/payment', {  // Điều chỉnh đường dẫn API
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    order_id: 1, //  Giả sử, điều chỉnh khi xong order
                    amount: 70000, // Giả sử, điều chỉnh khi xong order
                    status: 'pending',
                }),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Đang chờ khách thanh toán', result);
                setPaymentStatus('Đang chờ khách thanh toán');
            } else {
                console.error('Lỗi', response.statusText);
                setPaymentStatus('Lỗi');
            }
        } catch (error) {
            console.error('Yêu cầu  thất bại', error);
            setPaymentStatus('Yêu cầu  thất bại');
        }
    };

    return (
        <div className='container-fluid bg-light vh-100'>
            <div
                className='position-relative container bg-white border border-light border-2'
                style={{ top: "20px", padding: "3%", width: "40%" }}
            >
                <h1 className='text-center'>Thông tin chuyển đi</h1>

                <div style={{ lineHeight: "40px" }}>
                    <div>
                        <span><strong>Khách hàng: </strong></span>
                        <span id='customer'>Vũ Đức Long</span>
                    </div>
                    <div>
                        <span><strong>Điểm xuất phát: </strong></span>
                        <span id='start'>37 phố Lê Văn Hiến</span>
                    </div>
                    <div>
                        <span><strong>Điểm đích: </strong></span>
                        <span id='destination'>Đại học Quốc gia Hà Nội</span>
                    </div>
                    <div>
                        <span><strong>Quãng đường: </strong></span>
                        <span id="length">4.7 km</span>
                    </div>
                    <div>
                        <span><strong>Tổng khách trả: </strong></span>
                        <span id="fee">70.000đ</span>
                    </div>
                </div>

                <div className="container text-center py-2 mt-4 d-flex justify-content-center">
                    <button
                        className="border border-2 px-5 rounded-2 text-white me-3"
                        style={{ padding: "5px", backgroundColor: "#00b14f" }}
                        onClick={handlePayment}  // Thêm sự kiện khi nhấn nút
                    >
                        <strong>Đã đến nơi</strong>
                    </button>
                    <button
                        className="border border-2 px-5 rounded-2 text-white"
                        style={{ padding: "5px", backgroundColor: "#007bff" }}
                    >
                        <strong>Đã thanh toán</strong>
                    </button>
                </div>

                {paymentStatus && (
                    <div className="alert alert-info mt-4">
                        <strong>{paymentStatus}</strong>
                    </div>
                )}
            </div>

            {/* <div className="container text-center py-2 mt-2">
            </div> */}
        </div>
    );
};

export default Payment;
