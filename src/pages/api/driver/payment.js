import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    // Chỉ cho phép phương thức POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Phương thức không được phép' });
    }

    // Lấy dữ liệu từ request body
    const { order_id, amount, status } = req.body;

    // Kiểm tra xem dữ liệu có đầy đủ không
    if (!order_id || !amount || !status) {
        return res.status(400).json({ error: 'Thiếu tham số yêu cầu' });
    }

    try {

        // Chèn bản ghi thanh toán mới vào bảng payment
        const result = await executeQuery(
            `INSERT INTO payments (order_id, amount, status, created_at) 
             VALUES (?, ?, ?, NOW())`,
            [order_id, amount, status]
        );

        // Trả về phản hồi thành công với dữ liệu bản ghi vừa thêm
        return res.status(200).json({
            id: result.insertId, // ID tự động tăng
            order_id: order_id,
            amount: amount,
            status: status,
            created_at: new Date().toISOString()
        });
    } catch (error) {
        console.error('Payment insertion error:', error);
        return res.status(500).json({ error: 'Đã xảy ra lỗi khi thêm thanh toán' });
    }
}