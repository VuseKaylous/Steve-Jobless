'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const CrabLogo = () => (
  <div className="d-flex align-items-center gap-4">
    <svg viewBox="0 0 300 60" style={{ height: '4rem' }}>
      <g fill="#00B14F" transform="translate(0, 10)">
        <path d="M15 8.5C8.4 8.5 3 13.9 3 20.5s5.4 12 12 12c4.4 0 8.2-2.4 10.2-6h-6.1c-1.2 1.2-2.6 2-4.1 2-3.3 0-6-2.7-6-6s2.7-6 6-6c1.5 0 2.9.8 4.1 2h6.1c-2-3.6-5.8-6-10.2-6z" transform="scale(1.5)" />
        <path d="M45 9.5h-6v22h6v-8h4l6 8h7l-7-9.3c3.3-1.7 5-4.7 5-7.7 0-3.9-3.1-5-7-5h-8zm0 9v-4h2c1.7 0 3 .3 3 2s-1.3 2-3 2h-2z" transform="translate(30) scale(1.5)" />
        <path d="M75 9.5h-6l-8 22h6l1.5-4h7l1.5 4h6l-8-22zm-5 13l2-5.5 2 5.5h-4z" transform="translate(60) scale(1.5)" />
        <path d="M95 9.5h-8v22h8c3.9 0 7-1.1 7-5 0-2.4-1.3-4.1-3-4.8 1.7-.7 3-2.4 3-4.2 0-3.9-3.1-8-7-8zm-2 9v-4h2c1.7 0 3 .3 3 2s-1.3 2-3 2h-2zm0 8v-4h2c1.7 0 3 .3 3 2s-1.3 2-3 2h-2z" transform="translate(90) scale(1.5)" />
      </g>
    </svg>
    <span className="display-6">For Customer</span>
  </div>
);

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const requestData = {
        email: email,
        password: password,
        
      };

      const response = await fetch('/api/customer/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Đã xảy ra lỗi khi đăng nhập');
      }

      // Store user data in localStorage or state management solution
      localStorage.setItem('customer', JSON.stringify(data));

      // Redirect to dashboard or home page
      router.push('./booking');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-white p-4">
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-6">
            <CrabLogo />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-5">
              <h2 className="fw-semibold mb-4">Đăng nhập</h2>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label text-secondary">
                    Nhập email tài khoản đăng ký
                  </label>
                  <input
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label text-secondary">
                      Mật khẩu
                    </label>
                    <a href="./forgot-password" className="text-success text-decoration-none">
                      Quên mật khẩu?
                    </a>
                  </div>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="eg: ••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control pe-5"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="btn btn-link position-absolute end-0 top-50 translate-middle-y text-secondary"
                      style={{ textDecoration: 'none' }}
                    >
                      {showPassword ? "Ẩn" : "Hiện"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 mb-4"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;