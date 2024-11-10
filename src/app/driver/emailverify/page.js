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
                    Crab
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
                        <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-500 rounded-full">
                            2
                        </div>
                        <span className="ml-2 text-gray-500">Tải lên giấy tờ</span>
                    </div>
                    <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full">
                            3
                        </div>
                        <span className="ml-2 text-green-500 font-medium">Xác minh email</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Nhập mã OTP</h2>
                    <p className="text-gray-600 mb-4">
                        Vui lòng kiểm tra hộp thư đến cùng như mục <span className="font-medium">Thư rác</span> và <span className="font-medium">Khuyến mãi</span> của bạn để xem mã OTP.
                    </p>
                    <div className="flex items-center space-x-4 mb-4">
                        <input
                            type="text"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            placeholder="Nhập OTP"
                        />
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