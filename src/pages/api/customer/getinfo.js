import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  const { driverId } = req.body;

  try {
    const query = 'SELECT name, phone_number, vehicle_registration FROM drivers WHERE id = ?';
    const drivers = await executeQuery(query, [driverId]);

    if (drivers.length === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    const driver = drivers[0];
    return res.status(200).json(driver);
  } catch (error) {
    console.error('Error fetching driver information:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}