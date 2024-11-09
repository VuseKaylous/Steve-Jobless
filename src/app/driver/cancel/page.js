import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cancellation = () => {
  return (
    <div className="container my-5">
      <div className="card p-4 shadow-sm">
        <h5 className="card-title">TÀI XẾ MUỐN HỦY CHUYẾN?</h5>
        <div className="card-body">
          <div className="mb-3">
            <strong>Mã Giao Dịch: </strong>
            <a href="#">VNU-23WXIH5WWGS4</a>
          </div>
          <div className="mb-3">
            <strong>Điểm Xuất Phát: </strong>
            <span>144 Xuân Thủy, Cầu Giấy, Hà Nội</span>
          </div>
          <div className="mb-3">
            <strong>Đích Đến: </strong>
            <span>64 Vũ Trọng Phụng, Thanh Xuân, Hà Nội</span>
          </div>
          <div className="mb-3">
            <strong>Dịch Vụ: </strong>
            <span>Crab</span>
          </div>
          <div className="mb-3">
            <strong>Phạt Hủy Chuyến: </strong>
            <span>15 300 VNĐ</span>
          </div>
          <div className="text-danger mt-1">
            *Nếu hủy chuyến, tài khoản của bạn có nguy cơ bị khóa tạm thời.
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