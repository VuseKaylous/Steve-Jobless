import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';

export default function BusinessRegistration() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!email) {
      setMessage('Vui lòng nhập email.');
      return;
    }

    const res = await fetch('/api/customers/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="w-50 bg-image" style={{ backgroundImage: 'url(/image2.png)', backgroundSize: 'cover', backgroundPosition: 'left' }}></div>
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
          <button onClick={handleSubmit} className="btn btn-success w-100 py-2 mb-3">Gửi</button>
          {message && <p className="text-center">{message}</p>}
          <button className="btn btn-outline-secondary w-100 py-2">Quay lại Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}
