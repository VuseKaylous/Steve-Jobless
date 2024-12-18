import { executeQuery } from '../../../lib/db';

export default async function handler(req, res) {
    try {
        const { customerID, driverID, orderID, reportType, comment } = req.body;
        const query = `
            INSERT INTO reports (customer_id, driver_id, order_id, status, comment)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [customerID, driverID, orderID, reportType, comment];

        await executeQuery(query, values);

        res.status(200).json({ message: 'Report inserted successfully' });
    } catch (error) {
        console.error('Error inserting report:', error);
        res.status(500).json({ error: error.message });
    }
}