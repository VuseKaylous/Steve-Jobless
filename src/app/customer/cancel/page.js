import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cancellation = () => {
  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h5 className="card-title">BẠN MUỐN HỦY CHUYẾN?</h5>
        <div className="card-body">
          <div className="mb-3">
            <strong>Mã Giao Dịch: </strong>
            <a href="#">VNU-23WXIH5WWGS4</a>
          </div>
          <div className="mb-3">
            <strong>Điểm Xuất Phát: </strong>
            <span id="start_pos">144 Xuân Thủy, Cầu Giấy, Hà Nội</span>
          </div>
          <div className="mb-3">
            <strong>Đích Đến: </strong>
            <span id="end_pos">64 Vũ Trọng Phụng, Thanh Xuân, Hà Nội</span>
          </div>
          <div className="mb-3">
            <strong>Dịch Vụ: </strong>
            <span>Crab</span>
          </div>
          <div className="mb-3">
            <strong>Phí Hủy Chuyến: </strong>
            <span id="fee">15 300 VNĐ</span>
          </div>
          <div className="mb-3">
            <strong>Lý Do: </strong>
            <textarea 
              className="form-control mt-2" 
              placeholder="Lý do bạn hủy chuyến đi này?"
              rows="3"
            ></textarea>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-outline-danger me-3">Hủy Chuyến</button>
            <button className="btn btn-outline-danger me-3">Quay Lại</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cancellation;