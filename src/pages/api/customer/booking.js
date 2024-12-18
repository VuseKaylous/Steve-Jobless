import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    const { customer_id, origin, destination } = req.body;
    const insertQuery = 'INSERT INTO orders (status, customer_id, pickup_location, dropoff_location) VALUES (?, ?, ?, ?)';
    const result = await executeQuery(insertQuery, ["tìm tài xế", customer_id, origin, destination]);
    const insertedOrderId = result.insertId;
    const checkQuery = 'SELECT status, driver_id FROM orders WHERE id = ?';
    const checkStatus = async () => {
        const insertedOrder = await executeQuery(checkQuery, [insertedOrderId]);
        if (insertedOrder.length > 0 && insertedOrder[0].status === "đợi tài xế") {
            return insertedOrder[0].driver_id;
        }
        return null;
    };
    const waitForStatusChange = async () => {
        while (true) {
            const driverId = await checkStatus();
            if (driverId) {
                return driverId;
            }
            await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
        }
    };
    const driverId = await waitForStatusChange();
    res.status(200).json({ message: 'Order status changed to "đợi tài xế"', driver_id: driverId, order_id: insertedOrderId });
}