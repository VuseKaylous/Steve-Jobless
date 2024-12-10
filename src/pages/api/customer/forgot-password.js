import { executeQuery } from '@/lib/db';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;
            console.log('email:', email);

            // Kiểm tra xem email có tồn tại trong cơ sở dữ liệu không
            const query = 'SELECT id, name FROM customers WHERE email = ?';
            const customers = await executeQuery(query, [email]);

            if (customers.length === 0) {
                return res.status(401).json({ error: 'Email không tồn tại' });
            }

            const customer = customers[0];

            return res.status(200).json({ message: 'Đặt lại mật khẩu của bạn' });
        } catch (error) {
            console.error('Reset password error:', error);
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
