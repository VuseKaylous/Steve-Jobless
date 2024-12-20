import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    const { orderId } = req.body;  // Đảm bảo lấy đúng orderId từ body của request

    try {
        const query1 = 'SELECT * FROM orders WHERE id = ?';
        const result1 = await executeQuery(query1, [orderId]);  // Sử dụng orderId thay vì order_id

        if (result1.length === 0) {
            return res.status(404).json({ error: 'Order not found' });
        }

        const query2 = 'SELECT name FROM customers WHERE id = ?';
        const result2 = await executeQuery(query2, [result1[0].customer_id]);

        if (result2.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        const query3 = 'SELECT amount FROM payments WHERE order_id = ?';
        const result3 = await executeQuery(query3, [orderId]);

        if (result3.length === 0) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        return res.status(200).json({
            status: result1[0].status,
            customer_name: result2[0].name,
            origin: result1[0].pickup_location,
            destination: result1[0].dropoff_location,
            fee: result3[0].amount
        });
    } catch (error) {
        console.error('Error fetching order status:', error);
        return res.status(500).json({ error: error.message });  // Sửa lại 'messsage' thành 'message'
    }
}
