import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    
    try {
        const { orderID } = req.query;

        if (orderID === undefined) {
            return res.status(400).json({ error: 'Missing orderID' });
        }

        const checkStatus = async () => {
            const checkStatusQuery = 'SELECT status FROM payments WHERE order_id = ?';
            const result = await executeQuery(checkStatusQuery, [orderID]);

            if (result.length === 0) {
                return res.status(404).json({ error: 'Payment not found' });
            }

            if (result.length > 0 && result[0].status === "hoàn thành") {
                clearInterval(intervalId);
                return res.status(200).json({ message: 'Payment completed', result });
            }
        };

        const intervalId = setInterval(checkStatus, 5000);

    } catch (error) {
        console.error('Error inserting payment:', error);
        return res.status(500).json({ error: error.message });
    }
}