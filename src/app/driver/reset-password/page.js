'use client';

import { useState } from 'react';

export default function ResetDriverPassword() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      setMessage('Mật khẩu xác nhận không khớp.');
      return;
    }

    try {
      const response = await fetch('/api/reset-driver-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, phone, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Đặt lại mật khẩu thành công! Hãy đăng nhập lại.');
      } else {
        setMessage(data.message || 'Có lỗi xảy ra.');
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('Lỗi kết nối với server.');
    }
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="w-50 bg-image" style={{ backgroundImage: 'url(/image2.png)', backgroundSize: 'cover', backgroundPosition: 'left' }}>
      </div>
      <div className="w-50 d-flex flex-column align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h2 className="h3 fw-bold text-dark mb-4">Đặt lại mật khẩu</h2>
          <p className="text-muted mb-3">Vui lòng nhập thông tin của bạn để đặt lại mật khẩu.</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Nhập mật khẩu mới"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Xác nhận mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-success w-100 py-2 mb-3" onClick={handleResetPassword}>
            Gửi yêu cầu
          </button>
          {message && <p className="text-center text-info mt-3">{message}</p>}
          <button className="btn btn-outline-secondary w-100 py-2" onClick={() => window.location.href = '/login'}>
            Quay lại Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
