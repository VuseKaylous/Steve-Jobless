import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';

// Load các biến môi trường từ file .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

async function testDatabaseConnection() {
  try {
    // Kiểm tra xem biến môi trường có đầy đủ không
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
    if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME) {
      throw new Error('Missing database configuration in environment variables');
    }

    // Tạo kết nối tới cơ sở dữ liệu
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
    });

    console.log('Connecting to database...');

    // Kiểm tra kết nối bằng truy vấn đơn giản
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    console.log('Database connected successfully!');
    console.log('Query result:', rows);

    // Đóng kết nối
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Failed to connect to the database:', error.message);
  }
}

// Gọi hàm kiểm tra
testDatabaseConnection();
