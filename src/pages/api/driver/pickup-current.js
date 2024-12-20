import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const driverId = req.body.driverId; // Giả sử `driverId` được gửi từ client

        if (!driverId) {
            return res.status(400).json({ error: 'Missing driverId' });
        }

        const query = `
            SELECT
                o.id, o.status, o.pickup_location AS origin, o.dropoff_location AS destination,
                o.created_at, c.name AS customer_name, c.phone_number AS customer_phone
            FROM orders o
            LEFT JOIN customers c ON o.customer_id = c.id
            WHERE o.status = 'tìm tài xế'
              AND (o.driver_id IS NULL OR o.driver_id = ?)
              AND o.id NOT IN (
                  SELECT order_id
                  FROM rejected_orders
                  WHERE driver_id = ?
              )
              AND EXISTS (
                  SELECT 1
                  FROM drivers d
                  WHERE d.id = ? AND d.status = 2
              )
            LIMIT 1;
        `;

        const orders = await executeQuery(query, [driverId, driverId, driverId]);

        if (orders.length === 0) {
            return res.status(200).json({ order: null });
        }

        return res.status(200).json({ order: orders[0] });
    } catch (error) {
        console.error('Error fetching current order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
