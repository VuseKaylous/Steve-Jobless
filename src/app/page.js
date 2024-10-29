'use client';
import './globals.css'; // CSS tùy chỉnh

export default function Register() {
  return (
    <div className="registration-container">
      <form className="registration-form-wrapper">
        <h1 className="form-header">Đăng ký thành viên Crab:</h1>
        <div className="user-type-selection">
          <label className="user-type-label">Bạn là:</label>
          <div className="radio-group">
            <label className="radio-option">
              <input type="radio" name="userType" value="customer" /> Khách hàng
            </label>
            <label className="radio-option">
              <input type="radio" name="userType" value="driver" /> Tài xế
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Họ và tên" required />
          </div>
          <div className="form-group">
            <input type="date" className="form-input" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="tel" className="form-input" placeholder="Số điện thoại" required />
          </div>
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Số CCCD" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="text" className="form-input" placeholder="Username" required />
          </div>
          <div className="form-group">
            <input type="password" className="form-input" placeholder="Password" required />
          </div>
        </div>

        <button type="submit" className="submit-button">Đăng ký</button>
      </form>
    </div>
  );
}
