import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, newPassword } = req.body;

            // Cập nhật mật khẩu mới cho người dùng
            const updatePasswordQuery = 'UPDATE customers SET password = ? WHERE email = ?';
            await executeQuery(updatePasswordQuery, [newPassword, email]);

            // Trả về thông báo thành công
            return res.status(200).json({ message: 'Mật khẩu đã được đặt lại thành công.' });

        } catch (error) {
            console.error('Error resetting password:', error);
            return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật mật khẩu.' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
