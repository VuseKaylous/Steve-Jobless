import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    const { orderID, fee } = req.body;
    if (!orderID || !fee) {
        console.log("No order id: " + orderID + " + " + fee)
        return res.status(400).json({ error: 'Thiếu tham số yêu cầu' });
    }
    try {
        const query = 'INSERT INTO payments (order_id, amount, status) VALUES (?, ?, ?)';
        const result = await executeQuery(query, [orderID, fee, "chờ"]);
        console.log(result);
        return res.status(200).json({ payment: result });
    } catch (error) {
        console.error('Error inserting payment:', error);
        return res.status(500).json({ error: error.message});
    }
}