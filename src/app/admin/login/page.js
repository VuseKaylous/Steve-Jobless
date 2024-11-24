'use client';
import React, { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="min-vh-100 bg-white">
      <nav className="navbar bg-light">
        <div className="container-fluid">
            {/* Title */}
            <span className="navbar-brand mb-0 h1" style={{ color: '#00b14f' }}>CrabForAdministration</span>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-5">
              <h2 className="fw-semibold mb-4 mt-5">Đăng nhập cho quản trị viên</h2>
              <form onSubmit={handleSubmit}>
                {/* Email field */}
                <div className="mb-4">
                  <label className="form-label text-secondary">
                    Nhập email của bạn
                  </label>
                  <input
                    type="email"
                    placeholder="example@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                  />
                </div>

                {/* Password field */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between">
                    <label className="form-label text-secondary">
                      Nhập mật khẩu
                    </label>
                  </div>
                  <div className="position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control pe-5"
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

                {/* Login button */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 mb-4"
                  style={{backgroundColor: "#00b14f"}}
                >
                  <strong>Đăng nhập</strong>
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