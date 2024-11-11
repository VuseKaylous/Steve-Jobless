'use client';
import 'bootstrap/dist/css/bootstrap.min.css';


import { useState } from 'react';

export default function BusinessRegistration() {
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
                    <div className="badge bg-success rounded-circle p-3 text-white">1</div>
                    <span className="ms-2 text-success fw-medium">Thông tin cá nhân</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <div className="badge bg-secondary rounded-circle p-3 text-white">2</div>
                    <span className="ms-2 text-muted">Xác minh email</span>
                  </div>
                </div>
                <div className="bg-light p-4 rounded">
                  <h2 className="h4 fw-bold text-dark mb-3">Thông tin cá nhân</h2>
                  <p className="text-muted mb-4">
                    Chúng tôi sẽ cần các giấy tờ đăng ký để chuẩn bị mọi thứ sẵn sàng trước khi bạn bắt đầu.
                  </p>
                  <form>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Quốc gia</label>
                        <select className="form-select">
                          <option>Việt Nam</option>
                          <option>Hoa Kỳ</option>
                          <option>Nhật Bản</option>
                          <option>Pháp</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="example@gmail.com"
                        />
                        <small className="text-muted">Chúng tôi sẽ xác minh thông tin này ở bước cuối cùng.</small>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Số điện thoại liên hệ của bạn</label>
                        <div className="input-group">
                          <select className="form-select">
                            <option>+84</option>
                            <option>+1</option>
                            <option>+81</option>
                            <option>+82</option>
                            <option>+33</option>
                          </select>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Bắt buộc cung cấp SĐT"

                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Họ và tên</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Ngày tháng năm sinh</label>
                        <input type="text" className="form-control" placeholder="dd/mm/yy" />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input type="password" className="form-control" />
                      </div>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                      Tiếp theo
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
