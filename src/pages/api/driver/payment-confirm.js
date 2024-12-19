import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    try {
        const { orderId, driver_id } = req.query;

        // Kiểm tra xem các tham số có đầy đủ không
        if (!orderId || !driver_id) {
            console.log("Missing parameters: orderId or driver_id");
            return res.status(400).json({ error: 'Thiếu tham số yêu cầu' });
        }

        // Cập nhật trạng thái thanh toán
        const updatePaymentQuery = `
            UPDATE payments
            SET status = 'hoàn thành'
            WHERE order_id = ?;
        `;
        await executeQuery(updatePaymentQuery, [orderId]);

        // Cập nhật trạng thái driver
        const updateDriverStatusQuery = `
            UPDATE drivers
            SET status = 2
            WHERE id = ?;
        `;
        await executeQuery(updateDriverStatusQuery, [driver_id]);

        // Trả về phản hồi thành công
        return res.status(200).json({
            message: "Payment updated to completed and driver status updated successfully"
        });
    } catch (error) {
        console.error('Error updating payment or driver status:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi cập nhật thanh toán hoặc trạng thái tài xế' });
    }
}
