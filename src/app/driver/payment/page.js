'use client';
import { useState, useEffect, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";
import { findCostFromAddress } from '@/components/Utils';


const Payment = () => {
    // const order_info = JSON.parse(localStorage.getItem("order_info"));
    const [order_info, setOrderInfo] = useState({id: ""});
    const [customer, setCustomer] = useState("");
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [fee, setFee] = useState(0);

    const router = useRouter();
    // const [driver, setDriver] = useState(() => {
    //     const storedDriver = localStorage.getItem("driver");
    //     return storedDriver ? JSON.parse(storedDriver) : null;
    //   });
    const [driver, setDriver] = useState(null)

    useEffect(() => {
        const storedDriver = localStorage.getItem("driver");
        if (storedDriver) {
            setDriver(JSON.parse(storedDriver));
        } else {
            router.push('./login');
        }
        // if (!driver) {
        //   router.push('./login');
        // }
        const storedOrder = localStorage.getItem("order_info");
        if (storedOrder) {
            setOrderInfo(JSON.parse(storedOrder));
        }
        const order_info = JSON.parse(storedOrder);
        console.log("Order info: " + order_info.id);
        const handleStatus = async () => {
            try {
                console.log("Order id: " + order_info.id);
            //   const response = await fetch(`/api/driver/status?orderId=${order_info.id}`);
                const response = await fetch('/api/driver/status', {
                    method: 'POST', // Thay đổi phương thức thành POST
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ orderId: order_info.id }) // Gửi orderId trong body dưới dạng JSON
                });
                const data = await response.json();
                setCustomer(data.customer_name);
                setStart(data.origin);
                setDestination(data.destination);
                setFee(findCostFromAddress(data.origin, data.destination));
                // setFee(parseInt(data.fee).toFixed(2));
            } catch (error) {
              console.error('Lỗi:', error);
            }
        };
        handleStatus();
        // setOrderInfo(localStorage.getItem("order_info"));
    }, []);

    const handlePayment = async () => {
        try {
            const driverId = driver?.id; // Lấy driver_id từ localStorage
            if (!driverId) {
                console.error('Driver ID is missing');
                return;
            }

            const response = await fetch(`/api/driver/payment-confirm?orderId=${order_info.id}&driver_id=${driverId}`);
            if (response.ok) {
                router.push("./pickup");
            } else {
                console.error('Failed to confirm payment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    // useEffect(() => {
    //     const handleStatus = async () => {
    //       try {
    //         console.log("Order id: " + order_info.id);
    //         const response = await fetch(`/api/driver/status?orderId=${order_info.id}`);
    //         const data = await response.json();
    //         setCustomer(data.customer_name);
    //         setStart(data.origin);
    //         setDestination(data.destination);
    //         setFee(findCostFromAddress(data.origin, data.destination));
    //         // setFee(parseInt(data.fee).toFixed(2));
    //       } catch (error) {
    //         console.error('Lỗi:', error);
    //       }
    //     };
    //     handleStatus();
    //   }, [order_info.id]);


    return (
        <div className='container-fluid bg-light vh-100'>
            <div
                className='position-relative container bg-white border border-light border-2'
                style={{ top: "20px", padding: "3%", width: "40%" }}
            >
                <h1 className='text-center'>Thông tin chuyến đi</h1>

                <div style={{ lineHeight: "40px" }}>
                    <div>
                        <span><strong>Khách hàng: </strong></span>
                        <span id='customer'>{customer}</span>
                    </div>
                    <div>
                        <span><strong>Điểm xuất phát: </strong></span>
                        <span id='start'>{start}</span>
                    </div>
                    <div>
                        <span><strong>Điểm đích: </strong></span>
                        <span id='destination'>{destination}</span>
                    </div>
                    <div>
                        <span><strong>Tổng khách trả: </strong></span>
                        <span id="fee">{fee} VNĐ</span>
                    </div>
                </div>

                <div className="container text-center py-2 mt-4 d-flex justify-content-center">
                    <button
                        className="border border-2 px-5 rounded-2 text-white"
                        style={{ padding: "5px", backgroundColor: "#007bff" }}
                        onClick={handlePayment}
                    >
                        <strong>Đã thanh toán</strong>
                    </button>
                </div>
            </div>
        </div>
    );
};

const SuspensePayment = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Payment />
        </Suspense>
    );
}

export default SuspensePayment;
