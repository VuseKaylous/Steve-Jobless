import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }
        const { orderID, fee } = req.body;
        console.log("From customer payment: " + orderID + " + " + fee);
        if (orderID === undefined || fee === undefined) {
            console.log("No order id: " + orderID + " + " + fee)
            return res.status(400).json({ error: 'Thiếu tham số yêu cầu' });
        }

        const query1 = 'SELECT * FROM payments WHERE order_id = ?';
        const result1 = await executeQuery(query1, [orderID]);
        if (result1.length > 0) {
            return res.status(200).json({ payment: result1[0] });
        }

        const query = 'INSERT INTO payments (order_id, amount, status) VALUES (?, ?, ?)';
        const result = await executeQuery(query, [orderID, fee, "chờ"]);
        console.log(result);
        return res.status(200).json({ payment: result });
    } catch (error) {
        console.error('Error inserting payment:', error);
        return res.status(500).json({ error: error.message});
    }
}