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

        // Xóa tài xế khỏi đơn hàng (giữ logic ban đầu)
        const updateOrderQuery = `
            UPDATE orders
            SET driver_id = NULL
            WHERE id = ?;
        `;
        const updateResult = await executeQuery(updateOrderQuery, [orderId]);

        if (updateResult.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or already processed' });
        }

        // Thêm vào bảng rejected_orders
        const insertRejectedOrderQuery = `
            INSERT INTO rejected_orders (driver_id, order_id, created_at)
            VALUES (?, ?, NOW());
        `;
        const insertResult = await executeQuery(insertRejectedOrderQuery, [driverId, orderId]);

        if (insertResult.affectedRows === 0) {
            return res.status(500).json({ error: 'Failed to save rejected order' });
        }

        return res.status(200).json({ message: 'Order declined and saved successfully' });
    } catch (error) {
        console.error('Error declining order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
