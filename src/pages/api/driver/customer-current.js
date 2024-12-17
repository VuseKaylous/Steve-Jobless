import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const driverId = req.query.driverId;
        if (!driverId) {
            return res.status(400).json({ error: 'Missing or invalid driverId' });
        }

        const STATUS_WAITING = 'đợi tài xế';
        const query = `
            SELECT
                o.id, o.status, o.pickup_location AS origin, o.dropoff_location AS destination,
                o.created_at
            FROM orders o
            WHERE o.status = ? AND (o.driver_id IS NULL OR o.driver_id = ?)
            LIMIT 1;
        `;
        const orders = await executeQuery(query, [STATUS_WAITING, driverId]);

        if (orders.length === 0) {
            return res.status(200).json({ order: null });
        }

        return res.status(200).json({ order: orders[0] });
    } catch (error) {
        console.error('Error fetching current order:', error);
        return res.status(500).json({
            error: process.env.NODE_ENV === 'development' ? error.message : 'Internal Server Error',
        });
    }
}
