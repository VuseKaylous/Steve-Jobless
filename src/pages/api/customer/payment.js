import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    const { orderID, fee } = req.query;
    try {
        const query = 'INSERT INTO payments (order_id, amount, status) VALUES (?, ?, ?)';
        const result = await executeQuery(query, [orderID, fee, "chờ"]);
        return res.status(200).json({ message: 'Đang thanh toán', result });
    } catch (error) {
        console.error('Error inserting payment:', error);
        return res.status(500).json({ error: error.message});
    }
}