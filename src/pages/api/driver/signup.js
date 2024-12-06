import { executeQuery } from '@/lib/db'; // Import hàm thực thi truy vấn từ file db.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Lấy dữ liệu từ request body
      const { name, email, password, birthdate, phone_number } = req.body;

      // Kiểm tra email đã tồn tại chưa
      const checkEmail = await executeQuery(
        'SELECT id FROM drivers WHERE email = ?',
        [email]
      );

      if (checkEmail.length > 0) {
        return res.status(400).json({ error: 'Email đã được sử dụng' });
      }

      // Thêm người dùng mới vào database
      const result = await executeQuery(
        `INSERT INTO drivers (name, email, password, birthdate, phone_number) 
         VALUES (?, ?, ?, ?, ?)`,
        [name, email, password, birthdate, phone_number]
      );

      // Trả về thông tin người dùng mới
      return res.status(200).json({
        id: result.insertId,
        name,
        email,
        birthdate,
        phone_number
      });
    } catch (error) {
      return res.status(500).json({ error: 'Đã xảy ra lỗi' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}