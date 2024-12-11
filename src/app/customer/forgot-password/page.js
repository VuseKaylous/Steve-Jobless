'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Dùng hook useRouter để điều hướng trang

export default function BusinessRegistration() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');  // State cho số điện thoại
  const [message, setMessage] = useState('');
  const router = useRouter();
  const handleSubmit = async () => {
    if (!email || !phone) {
      setMessage('Vui lòng nhập email và số điện thoại.');
      return;
    }

    const res = await fetch('/api/customer/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, phone }),
    });

    const data = await res.json();

    if (res.ok) {
      // Lưu email vào localStorage
      localStorage.setItem('resetEmail', email);
      // Nếu thông tin hợp lệ, điều hướng đến trang reset password
      setMessage(data.message);
      router.push('/customer/reset-password');  // Chuyển đến trang reset mật khẩu
    } else {
      // Nếu có lỗi (email hoặc số điện thoại không hợp lệ), hiển thị thông báo lỗi
      setMessage(data.error);
    }
  };

  const handleBackToLogin = () => {
    router.push('/customer/login');  // Chuyển hướng về trang login
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="w-50 bg-image" style={{ backgroundImage: 'url(/image2.png)', backgroundSize: 'cover', backgroundPosition: 'left' }}></div>
      <div className="w-50 d-flex flex-column align-items-center justify-content-center p-4">
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <h2 className="h3 fw-bold text-dark mb-4">Quên mật khẩu?</h2>
          <p className="text-muted mb-3">Vui lòng nhập email và số điện thoại của bạn để đặt lại mật khẩu.</p>
          <div className="mb-3">
            <input
              type="email"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Nhập email công việc của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control p-3 border border-secondary rounded"
              placeholder="Nhập số điện thoại của bạn"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit} className="btn btn-success w-100 py-2 mb-3">Gửi</button>
          {message && <p className="text-center">{message}</p>}
          <button onClick={handleBackToLogin} className="btn btn-outline-secondary w-100 py-2">Quay lại Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}
