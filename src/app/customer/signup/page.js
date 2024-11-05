'use client';
import './tailwind.css';

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
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
              1
            </div>
            <span className="ml-2 text-green-500 font-medium">Thông tin cá nhân</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full">
              2
            </div>
            <span className="ml-2 text-gray-500">Tải lên giấy tờ(Tài xế)</span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full">
              3
            </div>
            <span className="ml-2 text-gray-500">Xác minh email</span>
          </div>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Thông tin cá nhân</h2>
          <p className="text-gray-600 mb-4">
            Chúng tôi sẽ cần các giấy tờ đăng ký để chuẩn bị mọi thứ sẵn sàng trước khi bạn bắt đầu.
          </p>
          <form>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Quốc gia </label>
                <select className="w-full p-2 border border-gray-300 rounded">
                  <option>Việt Nam</option>
                  <option>Hoa Kỳ</option>
                  <option>Nhật Bản</option>
                  <option>Pháp</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email </label>
                <input
                  type="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="example@gmail.com"
                />
                <p className="text-gray-500 text-sm mt-1">
                  Chúng tôi sẽ xác minh thông tin này ở bước cuối cùng.
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Số điện thoại liên hệ của bạn
                </label>
                <div className="flex">
                  <select className="p-2 border border-gray-300 rounded-l">
                    <option>+84</option>
                    <option>+1</option>
                    <option>+81</option>
                    <option>+82</option>
                    <option>+33</option>
                  </select>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-r"
                    placeholder="Bắt buộc phải cung cấp số điện thoại liên hệ[C]"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Họ và tên</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Ngày tháng năm sinh</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="dd/mm/yy" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Số CCCD</label>
                <input type="text" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Mật khẩu</label>
                <input type="password" className="w-full p-2 border border-gray-300 rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Bạn là:</label>
                <div className="flex items-center space-x-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="position"
                      className="form-radio"
                      value="Khách hàng"
                      checked={position === 'Khách hàng'}
                      onChange={() => setPosition('Khách hàng')}
                    />
                    <span className="ml-2">Khách hàng</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="position"
                      className="form-radio"
                      value="Tài xế"
                      checked={position === 'Tài xế'}
                      onChange={() => setPosition('Tài xế')}
                    />
                    <span className="ml-2">Tài xế</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox" />
                <span className="ml-2 text-gray-700">
                  Bạn cần quyền truy cập vào CrabExpress API không?{' '}
                  <a href="#" className="text-blue-500">
                    Tìm hiểu thêm.
                  </a>
                </span>
              </label>
            </div>
            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
              Tiếp theo
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
