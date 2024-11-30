import React from 'react';

export default function MainNavigation({ setActiveComponent }) {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => setActiveComponent('customer-login')}>Customer Login</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('customer-register')}>Customer Register</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('customer-forgot-password')}>
            Customer Forgot Password
          </button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('driver-login')}>Driver Login</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('driver-register')}>Driver Register</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('driver-forgot-password')}>
            Driver Forgot Password
          </button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('admin-login')}>Admin Login</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('admin-register')}>Admin Register</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent('admin-forgot-password')}>
            Admin Forgot Password
          </button>
        </li>
      </ul>
    </nav>
  );
}
