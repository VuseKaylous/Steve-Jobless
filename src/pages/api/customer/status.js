import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    const { order_id } = req.query;

    try {
        const query = 'SELECT status FROM orders WHERE id = ?';
        const result = await executeQuery(query, [order_id]);

        if (result.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        return res.status(200).json({ status: result[0].status });
    } catch (error) {
        console.error('Error fetching order status:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}