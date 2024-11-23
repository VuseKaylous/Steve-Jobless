import React from 'react';

const Payment = () => {
  return (
    <div className='container-fluid bg-light vh-100'>
        <div className='position-relative container bg-white border border-light border-2' style={{top: "20px", padding: "3%", width: "40%"}}>
            
            <h1 className='text-center'>Xác nhận thanh toán</h1>
            
            <div style={{lineHeight: "40px"}}>
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
                    <span id='start'>Đại học Quốc gia Hà Nội</span>
                </div>
                <div>
                    <span><strong>Quãng đường: </strong></span>
                    <span id="length">4.7 km</span>
                </div>
                <div>
                    <span><strong>Tổng khách trả: </strong></span>
                    <span id="fee">74.000đ</span>
                </div>
                <div>
                    <span><strong>Chiết khấu: </strong></span>
                    <span id="discount">10%</span>
                </div>

                <div>
                    <span><strong>Tài xế thực lĩnh: </strong></span>
                    <span id="total">66 600đ</span>
                </div>

            </div>
            
            <div className="container text-center py-2 mt-2">
                <button className="border border-2 px-5 rounded-2 text-white" style={{padding: "5px", backgroundColor: "#00b14f"}}>
                    <strong>Đã thanh toán</strong>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Payment;