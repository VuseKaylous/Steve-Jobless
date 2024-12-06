import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, password, birthdate, phone_number } = req.body;

        // Check if email already exists
        const checkEmail = await executeQuery(
            'SELECT id FROM customers WHERE email = ?',
            [email]
        );

        if (checkEmail.length > 0) {
            return res.status(400).json({ error: 'Email đã được sử dụng' });
        }

        // Insert new customer
        const result = await executeQuery(
            `INSERT INTO customers (name, email, password, birthdate, phone_number) 
         VALUES (?, ?, ?, ?, ?)`,
            [name, email, password, birthdate, phone_number]
        );

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