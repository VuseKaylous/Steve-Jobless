import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { orderId, driverId } = req.body;

        if (orderId === null || orderId === undefined || driverId == null || driverId === undefined) {
            console.log("From pickup-accept api: " + orderId + " " + driverId);
            return res.status(400).json({ error: 'Missing orderId or driverId: ' + orderId + " + " + driverId });
        }

        // Cập nhật trạng thái đơn hàng nếu driver_id là NULL
        const orderUpdateQuery = `
            UPDATE orders
            SET status = 'đợi tài xế', driver_id = ?
            WHERE id = ? AND status = 'tìm tài xế' AND driver_id IS NULL;
        `;
        const orderResult = await executeQuery(orderUpdateQuery, [driverId, orderId]);

        // Nếu không có dòng nào được cập nhật, nghĩa là điều kiện không thỏa mãn
        if (orderResult.affectedRows === 0) {
            return res.status(409).json({ error: 'Order already accepted by another driver' });
        }

        // Cập nhật trạng thái tài xế thành "3" (đang thực hiện đơn hàng)
        const driverUpdateQuery = `
            UPDATE drivers
            SET status = 3
            WHERE id = ?;
        `;
        await executeQuery(driverUpdateQuery, [driverId]);

        // Lấy thông tin đơn hàng sau khi chấp nhận
        const orderQuery = `
            SELECT o.id, o.status, o.pickup_location AS origin, o.dropoff_location AS destination, o.created_at
            FROM orders o
            WHERE o.id = ?;
        `;
        const order = await executeQuery(orderQuery, [orderId]);

        if (order.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Trả về thông tin đơn hàng sau khi chấp nhận
        return res.status(200).json({
            message: 'Order accepted successfully',
            order: order[0]
        });
    } catch (error) {
        console.error('Error accepting order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
