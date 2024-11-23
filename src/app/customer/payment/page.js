import React from 'react';

const Payment = () => {
  return (
    <div className='container-fluid bg-light vh-100'>
        <div className='position-relative container bg-white border border-light border-2' style={{top: "20px", padding: "3%", width: "40%"}}>
            
            <h1 className='text-center'>Thanh toán hóa đơn</h1>
            
            <div className='text-white border border-2 rounded-2' style={{padding: "5px", backgroundColor: "#00b14f"}}>
                    <strong>Tóm tắt hành trình</strong>
            </div>
            
            <div style={{lineHeight: "40px"}}>
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
                    <span><strong>Tổng tạm tính: </strong></span>
                    <span id="fee">84.000đ</span>
                </div>
                <div>
                    <span><strong>Khuyến mãi: </strong></span>
                    <span id="discount">10.000đ</span>
                </div>

                <div>
                    <span><strong>Tổng cộng: </strong></span>
                    <span id="total">74.000đ</span>
                </div>

            </div>
            
            <div className='text-white border border-2 rounded-2' style={{padding: "5px", backgroundColor: "#00b14f"}}>
                <strong>Phương thức thanh toán</strong>
            </div>
            
            <div className="container">
                <div className="row">
                    <div className="col-md-1"></div>

                    <button className="bg-white col-md-4 my-3 py-2 border border-2 rounded-2">
                    <svg style={{bottom: "1px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="position-relative bi bi-bank" viewBox="0 0 16 16">
                        <path d="m8 0 6.61 3h.89a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5H15v7a.5.5 0 0 1 .485.38l.5 2a.498.498 0 0 1-.485.62H.5a.498.498 0 0 1-.485-.62l.5-2A.5.5 0 0 1 1 13V6H.5a.5.5 0 0 1-.5-.5v-2A.5.5 0 0 1 .5 3h.89zM3.777 3h8.447L8 1zM2 6v7h1V6zm2 0v7h2.5V6zm3.5 0v7h1V6zm2 0v7H12V6zM13 6v7h1V6zm2-1V4H1v1zm-.39 9H1.39l-.25 1h13.72z"/>
                    </svg>
                        <span className="ms-2">Chuyển khoản</span>
                    </button>

                    <div class="col-md-2"></div>

                    <button class="bg-white col-md-4 my-3 py-2 border border-2 rounded-2">
                        <svg style={{bottom: "1px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="position-relative bi bi-currency-dollar" viewBox="0 0 16 16">
                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                        </svg>
                        <span className="ms-1">Tiền mặt</span>
                    </button>

                </div>

                <div className="row">
                    <div className="col-md-1"></div>

                    <button class="bg-white col-md-4 my-2 py-2 border border-2 rounded-2">
                        <svg style={{bottom: "1px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="position-relative bi bi-credit-card" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                        </svg>
                        <span className="ms-2">VISA</span>
                    </button>

                    <div class="col-md-2"></div>

                    <button class="bg-white col-md-4 my-2 py-2 border border-2 rounded-2 bg-white">
                        <svg style={{bottom: "1px"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="position-relative bi bi-paypal" viewBox="0 0 16 16">
                            <path d="M14.06 3.713c.12-1.071-.093-1.832-.702-2.526C12.628.356 11.312 0 9.626 0H4.734a.7.7 0 0 0-.691.59L2.005 13.509a.42.42 0 0 0 .415.486h2.756l-.202 1.28a.628.628 0 0 0 .62.726H8.14c.429 0 .793-.31.862-.731l.025-.13.48-3.043.03-.164.001-.007a.35.35 0 0 1 .348-.297h.38c1.266 0 2.425-.256 3.345-.91q.57-.403.993-1.005a4.94 4.94 0 0 0 .88-2.195c.242-1.246.13-2.356-.57-3.154a2.7 2.7 0 0 0-.76-.59l-.094-.061ZM6.543 8.82a.7.7 0 0 1 .321-.079H8.3c2.82 0 5.027-1.144 5.672-4.456l.003-.016q.326.186.548.438c.546.623.679 1.535.45 2.71-.272 1.397-.866 2.307-1.663 2.874-.802.57-1.842.815-3.043.815h-.38a.87.87 0 0 0-.863.734l-.03.164-.48 3.043-.024.13-.001.004a.35.35 0 0 1-.348.296H5.595a.106.106 0 0 1-.105-.123l.208-1.32z"/>
                        </svg>
                        <span className="ms-2">PayPal</span>
                    </button>
                </div>
            </div>
            
            <div className="container text-center py-2 mt-2">
                <button className="border border-2 px-5 rounded-2 text-white" style={{padding: "5px", backgroundColor: "#00b14f"}}>
                    <strong>Thanh toán</strong>
                </button>
            </div>
        </div>
    </div>
  );
};

export default Payment;