import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    // Chỉ cho phép phương thức GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Phương thức không được phép' });
    }

    try {
        const { order_id } = req.query;

        // Kiểm tra order_id
        if (!order_id) {
            return res.status(400).json({ error: 'Thiếu thông tin order_id' });
        }

        // Tìm kiếm thanh toán pending với order_id
        const payments = await executeQuery(
            'SELECT * FROM payments WHERE order_id = ? AND status = ?',
            [order_id, 'pending']  // Dùng `order_id` thay vì `1`
        );

        if (payments.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thanh toán cho order_id này' });
        }

        // Giả sử chỉ có một thanh toán pending cho mỗi order_id
        const payment = payments[0];

        // Lấy thông tin đơn hàng từ bảng orders
        const orders = await executeQuery(
            'SELECT * FROM orders WHERE id = ?',
            [order_id]  // Dùng `order_id` thay vì `payment.order_id`
        );

        if (orders.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy thông tin chuyến' });
        }

        const order = orders[0];

        // Trả về thông tin thanh toán và đơn hàng
        return res.status(200).json({
            payment: {
                amount: payment.amount,  // Tiền thanh toán
            },
            order: {
                pickup_location: order.pickup_location,  // Điểm xuất phát
                dropoff_location: order.dropoff_location,  // Điểm đến
            }
        });
    } catch (error) {
        console.error('Payment retrieval error:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi lấy thông tin thanh toán' });
    }
}
