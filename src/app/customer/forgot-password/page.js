'use client';

import './tailwind.css';
import { useState } from 'react';

export default function BusinessRegistration() {
  const [email, setEmail] = useState('');

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-left" style={{ backgroundImage: 'url(/image2.png)' }}>

      </div>
      <div className="w-1/2 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Quên mật khẩu?</h2>
          <p className="text-gray-600 mb-4">Vui lòng nhập email của bạn và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu.</p>
          <div className="mb-4">
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Nhập email công việc của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="w-full bg-green-500 text-white px-4 py-2 rounded-lg mb-4">Gửi</button>
          <button className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg">Quay lại Đăng nhập</button>
        </div>
      </div>
    </div>
  );
}
