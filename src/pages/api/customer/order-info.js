import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  const { order_id } = req.query;

  try {
    const query = 'SELECT pickup_location, dropoff_location FROM orders WHERE id = ?';
    const result = await executeQuery(query, [order_id]);

    if (result.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const { pickup_location, dropoff_location } = result[0];
    return res.status(200).json({ pickup_location, dropoff_location });
  } catch (error) {
    console.error('Error fetching order information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}