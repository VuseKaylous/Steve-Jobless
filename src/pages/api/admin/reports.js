import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  try {
    // lấy id từ truy vấn
    const { id } = req.query;

    // Thực hiện một câu truy vấn đơn giản
    const reportRows = await executeQuery('SELECT * FROM reports WHERE driver_id = ?', [id]);
    const userRows = await executeQuery('SELECT * FROM drivers WHERE id = ?', [id]);
    // Trả kết quả về client (JSON)
    res.status(200).json({ reportData: reportRows, userData: userRows });

    // Đóng kết nối
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}