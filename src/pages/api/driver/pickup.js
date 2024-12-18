import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        // Chỉ cho phép sử dụng GET
        if (req.method !== 'GET') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        // Truy vấn các đơn hàng pending và JOIN với bảng customers để lấy thông tin khách hàng
        const query = `
            SELECT
                o.id, o.status, o.pickup_location, o.dropoff_location, o.created_at,
                c.name AS customer_name, c.phone_number AS customer_phone
            FROM orders o
            INNER JOIN customers c ON o.customer_id = c.id
            WHERE o.status = 'pending';
        `;

        const pendingOrders = await executeQuery(query);

        // Kiểm tra nếu không có đơn nào pending
        if (pendingOrders.length === 0) {
            return res.status(200).json({ message: 'No pending orders', data: [] });
        }

        // Trả về danh sách đơn hàng pending
        return res.status(200).json({ message: 'Pending orders found', data: pendingOrders });
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
