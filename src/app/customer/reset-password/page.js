'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');  // State cho mật khẩu mới
    const [confirmPassword, setConfirmPassword] = useState('');  // State cho xác nhận mật khẩu
    const [message, setMessage] = useState('');
    const router = useRouter();

    // Lấy email từ localStorage
    const email = typeof window !== 'undefined' ? localStorage.getItem('resetEmail') : null;

    useEffect(() => {
        if (!email) {
            router.push('/forgot-password');  // Nếu không có email trong localStorage, chuyển đến trang forgot-password
        }
    }, [email, router]);

    const handleSubmit = async () => {
        if (!newPassword || !confirmPassword) {
            setMessage('Vui lòng nhập mật khẩu mới và xác nhận mật khẩu.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setMessage('Mật khẩu mới và xác nhận mật khẩu không khớp.');
            return;
        }

        // Gửi yêu cầu đến API để reset mật khẩu
        const res = await fetch('/api/customer/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, newPassword }),
        });

        const data = await res.json();

        if (res.ok) {
            // Nếu thành công, chuyển hướng đến trang đăng nhập
            setMessage(data.message);
            router.push('/customer/login');  // Chuyển đến trang login sau khi đặt lại mật khẩu
        } else {
            // Nếu có lỗi, hiển thị thông báo lỗi
            setMessage(data.error);
        }
    };

    return (
        <div className="d-flex min-vh-100">
            <div className="w-50 bg-image" style={{ backgroundImage: 'url(/image2.png)', backgroundSize: 'cover', backgroundPosition: 'left' }}></div>
            <div className="w-50 d-flex flex-column align-items-center justify-content-center p-4">
                <div className="w-100" style={{ maxWidth: '400px' }}>
                    <h2 className="h3 fw-bold text-dark mb-4">Đặt lại mật khẩu</h2>
                    <p className="text-muted mb-3">Vui lòng nhập mật khẩu mới của bạn để đặt lại mật khẩu.</p>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control p-3 border border-secondary rounded"
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control p-3 border border-secondary rounded"
                            placeholder="Xác nhận mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit} className="btn btn-success w-100 py-2 mb-3">Xác nhận</button>
                    {message && <p className="text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
}
