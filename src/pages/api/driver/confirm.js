import { executeQuery } from '@/lib/db'; // Hàm xử lý query database

export default async function handler(req, res) {
    try {
        // Chỉ cho phép sử dụng POST
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { id } = req.body;

        // Kiểm tra nếu không có `id` trong request body
        if (!id) {
            return res.status(400).json({ error: 'Order ID is required' });
        }

        // Cập nhật trạng thái đơn hàng trong database
        const updateQuery = `UPDATE orders SET status = 'confirmed' WHERE id = ?`;
        const result = await executeQuery(updateQuery, [id]);

        // Kiểm tra nếu không có bản ghi nào được cập nhật
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or already updated' });
        }

        // Trả về phản hồi thành công
        return res.status(200).json({ message: `Order ${id} confirmed successfully` });
    } catch (error) {
        console.error('Error confirming order:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
