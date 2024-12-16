import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, phone } = req.body;

            // Kiểm tra xem email và số điện thoại có tồn tại trong cơ sở dữ liệu không
            const query = 'SELECT id, name FROM customers WHERE email = ? AND phone_number = ?';
            const customers = await executeQuery(query, [email, phone]);

            if (customers.length === 0) {
                return res.status(401).json({ error: 'Email hoặc số điện thoại sai' });
            }

            // Nếu email và số điện thoại hợp lệ, trả về thông báo để chuyển hướng sang trang reset password
            return res.status(200).json({ message: 'Email và số điện thoại hợp lệ' });
        } catch (error) {
            console.error('Reset password error:', error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}