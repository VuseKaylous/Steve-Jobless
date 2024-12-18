import { executeQuery } from '@/lib/db';
import { FindCost } from '@/components/Utils';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
      }
    
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: "Missing userIds or message" });
        }
      
        // const { order_id } = req.body;

        // const query = 'SELECT customer_id, pickup_location, dropoff_location FROM drivers WHERE id = ?';
        // const order = await executeQuery(query, [order_id]);

        // find available drivers
        const userIds = await executeQuery(
            'SELECT id FROM drivers WHERE status = ?', [1]
        );
        // console.log(userIds);

        userIds.forEach((userId) => {
            const socketId = global.connectedUsers[userId["id"]];
            if (socketId && global.io) {
                // global.io.to(socketId).emit("new-order", { order_id });
                global.io.to(socketId).emit("new-order", { message });
            }
        });
    
        res.status(200).json({ message: "Sent information to all available drivers" });

        // if (checkEmail.length > 0) {
        //     return res.status(400).json({ error: 'Email đã được sử dụng' });
        // }

        // Insert new customer
        // const result = await executeQuery(
        //     `INSERT INTO customers (name, email, password, birthdate, phone_number) 
        //  VALUES (?, ?, ?, ?, ?)`,
        //     [name, email, password, birthdate, phone_number]
        // );

        // return res.status(200).json({
        //     id: result.insertId,
        //     name,
        //     email,
        //     phone_number
        // });
    } catch (error) {
        console.error('Cannot send notification to drivers:', error);
        // return res.status(500).json({ error: error.message });
    }
}