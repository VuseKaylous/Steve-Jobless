import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  try {
    // Thực hiện một câu truy vấn đơn giản
    const customers = await executeQuery('SELECT * FROM customers');
    const drivers = await executeQuery('SELECT * FROM drivers');
    
    // Trả kết quả về client (JSON)
    res.status(200).json({ customersData: customers, driversData: drivers });

    // Đóng kết nối
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}