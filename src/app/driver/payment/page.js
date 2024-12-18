'use client';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams } from 'next/navigation';
import { useRouter } from "next/navigation";


const Payment = () => {
    const [paymentStatus, setPaymentStatus] = useState("Đang chờ khách thanh toán"); // Theo dõi trạng thái thanh toán

    const router = useRouter();
    const searchParams = useSearchParams();
    const [driver, setDriver] = useState(() => {
        const storedDriver = localStorage.getItem("driver");
        return storedDriver ? JSON.parse(storedDriver) : null;
      });

    useEffect(() => {
        if (!driver) {
          router.push('./login');
        }
    }, [router]);

    let order_id = localStorage.getItem("order_info");
    if (order_id) {
        order_id = JSON.parse(order_id);
    }
    console.log("Order id:" + order_id.id);

    const handlePayment = async () => {
        try {
            

            // const response = await fetch('/api/driver/payment-confirm', {  // Điều chỉnh đường dẫn API
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         order_id: order_id
            //     }),
            // });
            // const response = await fetch(`/api/driver/payment-confirm?orderId=7`);
            const response = await fetch('/api/driver/payment-confirm', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderId: order_id.id,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                setPaymentStatus('Đã thanh toán');
                console.log('Đã thanh toán', result);
                router.push("./pickup")
            } else {
                console.error('Lỗi thanh toan', response.error);
                setPaymentStatus('Lỗi');
            }
        } catch (error) {
            console.error('Yêu cầu thất bại', error);
            setPaymentStatus('Yêu cầu thất bại');
        }
    }

    // const handlePayment = async () => {
    //     try {
    //         const response = await fetch('/api/driver/payment', {  // Điều chỉnh đường dẫn API
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 order_id: 1, //  Giả sử, điều chỉnh khi xong order
    //                 amount: 70000, // Giả sử, điều chỉnh khi xong order
    //                 status: 'pending',
    //             }),
    //         });

    //         if (response.ok) {
    //             const result = await response.json();
    //             console.log('Đang chờ khách thanh toán', result);
    //             setPaymentStatus('Đang chờ khách thanh toán');
    //         } else {
    //             console.error('Lỗi', response.statusText);
    //             setPaymentStatus('Lỗi');
    //         }
    //     } catch (error) {
    //         console.error('Yêu cầu  thất bại', error);
    //         setPaymentStatus('Yêu cầu  thất bại');
    //     }
    // };

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
                    {/* <button
                        className="border border-2 px-5 rounded-2 text-white me-3"
                        style={{ padding: "5px", backgroundColor: "#00b14f" }}
                        onClick={handlePayment}  // Thêm sự kiện khi nhấn nút
                    >
                        <strong>Đã đến nơi</strong>
                    </button> */}
                    <button
                        className="border border-2 px-5 rounded-2 text-white"
                        style={{ padding: "5px", backgroundColor: "#007bff" }}
                        onClick={handlePayment}
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
