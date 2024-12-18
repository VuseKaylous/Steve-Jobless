import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { orderId, driverId } = req.body;

        if (!orderId || !driverId) {
            return res.status(400).json({ error: 'Missing orderId or driverId' });
        }

        const query = `
            UPDATE orders
            SET driver_id = NULL
            WHERE id = ?;
        `;

        const result = await executeQuery(query, [orderId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or already processed' });
        }

        return res.status(200).json({ message: 'Order declined successfully' });
    } catch (error) {
        console.error('Error declining order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
