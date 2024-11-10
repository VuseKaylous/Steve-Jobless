'use client';

import './tailwind.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSelection = (role) => {
    if (role === 'customer') {
      alert('Bạn đã chọn vai trò: Khách hàng');
      // Thêm logic xử lý dành cho khách hàng ở đây
      router.push('/customer/signup');
    } else if (role === 'driver') {
      alert('Bạn đã chọn vai trò: Tài xế');
      // Thêm logic xử lý dành cho tài xế ở đây
      router.push('/driver/signup');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/background.jpg')" }}>
      <h2 className="text-2xl font-bold mb-6">Bạn là ?</h2>
      <button
        className="w-48 p-4 mb-4 text-lg font-medium text-white bg-green-500 rounded hover:bg-green-600 transition duration-300 flex items-center justify-center"
        onClick={() => handleSelection('customer')}
      >
        <img src="/user.png" alt="Khách hàng" className="w-6 h-6 mr-2" /> Khách hàng
      </button>
      <button
        className="w-48 p-4 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        onClick={() => handleSelection('driver')}
      >
        <img src="/car.png" alt="Tài xế" className="w-6 h-6 mr-2" /> Tài xế
      </button>
    </div>
  );
}