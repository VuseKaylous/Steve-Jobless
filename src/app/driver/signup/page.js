'use client';

import './tailwind.css';



// pages/business-registration.js
import { useState } from 'react';

export default function BusinessRegistration() {
  const [position, setPosition] = useState('');

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <img
          src="/image.png"
          alt="Business banner"
          className="w-full mb-6 rounded-lg"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          CrabExpress
        </h1>
        <p className="text-gray-600 mb-6">
          Quản lý nhu cầu di chuyển, đồ ăn và giao hàng của bạn
        </p>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full">
              1
            </div>
            <span className="ml-2 text-gray-500">Thông tin cá nhân</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
              2
            </div>
            <span className="ml-2 text-green-500 font-medium">Tải lên giấy tờ(Tài xế)</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full">
              3
            </div>
            <span className="ml-2 text-gray-500">Xác minh email</span>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tải lên giấy tờ</h2>
          <p className="text-gray-600 mb-4">
            Giấy tờ tài xế (phương tiện, biển số xe, mã số GPLX...)
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Hỗ trợ tập tin: PDF, DOC, DOCX, PNG, JPEG | Kích thước tập tin tối đa: 2 MB
          </p>
          <div className="border-dashed border-2 border-gray-300 p-4 rounded-lg mb-4">
            <label className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer inline-flex items-center">
              <span>Tải lên</span>
              <input type="file" className="hidden" accept=".pdf,.doc,.docx,.png,.jpeg" />
            </label>
          </div>
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg">Trước</button>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">Tiếp theo</button>
          </div>
        </div>
      </div>
    </div>
  );
}
