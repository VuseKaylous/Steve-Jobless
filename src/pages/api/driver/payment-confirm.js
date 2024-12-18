import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    // Chỉ cho phép phương thức POST
    try {

        const { orderId } = req.body;

        // Kiểm tra xem dữ liệu có đầy đủ không
        if (!orderId) {
            console.log("No order id: " + orderId + ": " + req.body)
            return res.status(400).json({ error: 'Thiếu tham số yêu cầu' });
        }

        const query = `
            UPDATE payments
            SET status = 'hoàn thành'
            WHERE order_id = ? ;
        `;
        const result = await executeQuery(query, [orderId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Order not found or already processed' });
        }

        console.log("It's supposed to update payment successfully")

        // Trả về phản hồi thành công với dữ liệu bản ghi vừa thêm
        return res.status(200).json({
            message: "Update payment to completed successfully"
        });
    } catch (error) {
        console.error('Payment insertion error:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm thanh toán' });
    }
}