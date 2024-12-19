import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { driver_id } = req.body;

    if (!driver_id) {
      return res.status(400).json({ message: 'Missing driver_id' });
    }

    try {
      // Cập nhật trạng thái tài xế thành offline (1 = offline)
      const query = 'UPDATE drivers SET status = ? WHERE id = ?';
      await executeQuery(query, [1, driver_id]);

      return res.status(200).json({ message: 'Driver logged out successfully' });
    } catch (error) {
      console.error('Error logging out driver:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
