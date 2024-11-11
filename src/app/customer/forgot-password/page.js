'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function BusinessRegistration() {
  const [email, setEmail] = useState('');

  return (
    <div className="d-flex min-vh-100">
      <div className="w-50 bg-image" style={{ backgroundImage: 'url(/image2.png)', backgroundSize: 'cover', backgroundPosition: 'left' }}>
      </div>
      <div className="w-50 d-flex flex-column align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h2 className="h3 fw-bold text-dark mb-4">Quên mật khẩu?</h2>
          <p className="text-muted mb-3">Vui lòng nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Nhập email công việc của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100 py-2 mb-3">Gửi</button>
          <button className="btn btn-outline-secondary w-100 py-2">Quay lại Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}
