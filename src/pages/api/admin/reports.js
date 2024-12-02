import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const dbConfig = {
    host: 'localhost',
    user: 'fall2024c56g8',
    password: 'unemployment',
    database: 'fall2024c56g8_crab',
    connectTimeout: 100000, // Thời gian chờ kết nối (10 giây)
  };

  try {
    // Tạo kết nối với MySQL
    const connection = await mysql.createConnection(dbConfig);

    // lấy id từ truy vấn
    const { id } = req.query;

    // Thực hiện một câu truy vấn đơn giản
    const [reportRows] = await connection.execute('SELECT * FROM reports WHERE driver_id = ?', [id]);
    const [userRows] = await connection.execute('SELECT * FROM drivers WHERE id = ?', [id]);
    // Trả kết quả về client (JSON)
    res.status(200).json({ reportData: reportRows, userData: userRows });

    // Đóng kết nối
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}