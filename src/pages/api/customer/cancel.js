import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { order_id } = req.body;

    try {
      const updateQuery = 'UPDATE orders SET status = ? WHERE id = ?';
      await executeQuery(updateQuery, ['hủy', order_id]);

      return res.status(200).json({ message: 'Order cancelled successfully' });
    } catch (error) {
      console.error('Error cancelling order:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}