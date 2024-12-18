'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleSelection = (role) => {
    if (role === 'customer') {
      alert('Bạn đã chọn vai trò: Khách hàng');
      // Thêm logic xử lý dành cho khách hàng ở đây
      router.push('/customer/login');
    } else if (role === 'driver') {
      alert('Bạn đã chọn vai trò: Tài xế');
      // Thêm logic xử lý dành cho tài xế ở đây
      router.push('/driver/login');
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-image" style={{ backgroundImage: "url('/background.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <h2 className="h4 fw-bold mb-4">Bạn là ?</h2>
      <button
        className="btn btn-success w-25 mb-3 d-flex align-items-center justify-content-center"
        onClick={() => handleSelection('customer')}
      >
        <img src="/user.png" alt="Khách hàng" className="me-2" style={{ width: '24px', height: '24px' }} /> Khách hàng
      </button>
      <button
        className="btn btn-primary w-25 d-flex align-items-center justify-content-center"
        onClick={() => handleSelection('driver')}
      >
        <img src="/car.png" alt="Tài xế" className="me-2" style={{ width: '24px', height: '24px' }} /> Tài xế
      </button>
    </div>
  );
}