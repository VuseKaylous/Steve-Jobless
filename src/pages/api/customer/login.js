import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        const { email, password } = req.body;
        const query = 'SELECT id, password, name FROM customers WHERE email = ?';
        const customers = await executeQuery(query, [email]);

        if (customers.length === 0) {
            return res.status(401).json({ error: 'Email không tồn tại' });
        }

        const customer = customers[0];
        
        if (password !== customer.password) {
            return res.status(401).json({ error: 'Mật khẩu không đúng' });
        }

        // Don't send password back to client
        const { password: _, ...customerWithoutPassword } = customer;

        return res.status(200).json(customerWithoutPassword);
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ error: error.message });
    }
}