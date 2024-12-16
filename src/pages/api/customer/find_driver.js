import { executeQuery } from '@/lib/db';
import { FindCost } from '@/components/Utils';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    
    try {
        const { userIds, message } = req.body;

        if (!userIds || !message) {
            return res.status(400).json({ message: "Missing userIds or message" });
        }
      
        // const { order_id } = req.body;

        // const query = 'SELECT customer_id, pickup_location, dropoff_location FROM drivers WHERE id = ?';
        // const order = await executeQuery(query, [order_id]);

        // find available drivers
        // const listDrivers = await executeQuery(
        //     'SELECT id, name FROM drivers WHERE status = ?', [1]
        // );

        userIds.forEach((userId) => {
            const socketId = global.connectedUsers[userId];
            if (socketId && global.io) {
              global.io.to(socketId).emit("new-notification", { message });
            }
        });
    
        res.status(200).json({ message: "Notifications sent successfully" });

        // if (checkEmail.length > 0) {
        //     return res.status(400).json({ error: 'Email đã được sử dụng' });
        // }

        // Insert new customer
        // const result = await executeQuery(
        //     `INSERT INTO customers (name, email, password, birthdate, phone_number) 
        //  VALUES (?, ?, ?, ?, ?)`,
        //     [name, email, password, birthdate, phone_number]
        // );

        return res.status(200).json({
            id: result.insertId,
            name,
            email,
            phone_number
        });
    } catch (error) {
        console.error('Signup error:', error);
        return res.status(500).json({ error: error.message });
    }
}