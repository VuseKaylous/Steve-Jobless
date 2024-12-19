import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        const { orderId, driverId } = req.query;

        if (!orderId || !driverId) {
            return res.status(400).json({ error: 'Missing orderId or driverId' });
        }

        // Cập nhật trạng thái đơn hàng
        const query = `
            UPDATE orders
            SET status = 'đang di chuyển', driver_id = ?
            WHERE id = ? AND status = 'đợi tài xế';
        `;
        const result = await executeQuery(query, [driverId, orderId]);

        // Cập nhật trạng thái tài xế
        const driverStatusQuery = `
            UPDATE drivers
            SET status = 3
            WHERE id = ?;
        `;
        const driverResult = await executeQuery(driverStatusQuery, [driverId]);

        // Lấy thông tin đơn hàng sau khi chấp nhận
        const orderQuery = `
            SELECT o.id, o.status, o.pickup_location AS origin, o.dropoff_location AS destination, o.created_at
            FROM orders o
            WHERE o.id = ?;
        `;
        const order = await executeQuery(orderQuery, [orderId]);

        // Trả về thông tin đơn hàng sau khi chấp nhận
        return res.status(200).json({
            message: 'Order accepted successfully',
            order: order[0]
        });
    } catch (error) {
        console.error('Error accepting order:', error);
        return res.status(500).json({ error: error.message });
    }
}
