import jwt from 'jsonwebtoken';
import { executeQuery } from '@/lib/db';

const SECRET_KEY = 'Steve_Jobless'; // Replace with your actual secret key

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.query;
  try {
    const rows = await executeQuery('SELECT * FROM admins WHERE username = ? AND password_hash = ?', [username, password]);

    if (rows.length > 0) {
      const token = jwt.sign({ username }, SECRET_KEY); // Create a token using the username and secret key
      res.status(200).json({ message: 'Login successful' , token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }

    await connection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}