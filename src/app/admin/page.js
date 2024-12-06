'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from "./Login.module.css";


const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/admin/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); 
        router.push('/admin/account/');
        // Redirect to the admin dashboard or another page
      } else {
        setAlertMessage('Sai mật khẩu. Vui lòng đăng nhập lại!');
        setTimeout(() => {
          setAlertMessage('');
        }, 1000); // Clear the alert message after 5 seconds

        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-vh-100 bg-white">
      <nav className="navbar bg-light">
        <div className="container-fluid">
            {/* Title */}
            <span 
              className="navbar-brand mb-0 h1" 
              style={{ color: '#00b14f' }}
            >
              CrabForAdministration
            </span>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="mb-5">
              <h2 className="fw-semibold mb-4 mt-5">
                Đăng nhập cho quản trị viên
              </h2>
              <form onSubmit={handleSubmit}>
                {/* username field */}
                <div className="mb-4">
                  <label className="form-label text-secondary">
                    Nhập tên đăng nhập của bạn
                  </label>
                  <input
                    type="text"
                    placeholder="Tên đăng nhập của Quản trị viên"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control"
                    required
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
                      placeholder="••••••••••••"
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

                {/* Login button */}
                <button
                  type="submit"
                  className="btn btn-success w-100 py-2 mb-4"
                  style={{backgroundColor: "#00b14f"}}
                >
                  <strong>Đăng nhập</strong>
                </button>
              </form>
              {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
