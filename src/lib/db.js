import mysql from 'mysql2/promise';

// Cấu hình kết nối database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: process.env.DB_WAIT_FOR_CONNECTIONS,
  connectionLimit: process.env.DB_POOL_SIZE,
  queueLimit: process.env.DB_QUEUE_LIMIT,
  connectTimeout: process.env.DB_TIMEOUT
};

// Biến lưu trữ connection pool
let connectionPool = null;

// Hàm tạo connection pool
function createConnectionPool() {
  if (!connectionPool) {
    connectionPool = mysql.createPool(dbConfig);
  }
  return connectionPool;
}

// Hàm thực thi truy vấn
export async function executeQuery(query, values = []) {
  try {
    // Tạo connection pool nếu chưa tồn tại
    const pool = createConnectionPool();

    // Thực thi truy vấn
    const [results] = await pool.execute(query, values);

    return results;
  } catch (error) {
    console.error('Database Query Error:', error);

    // Xử lý các loại lỗi cụ thể
    if (error.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
      connectionPool = null; // Reset connection pool
    }

    if (error.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }

    if (error.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }

    throw error; // Ném lỗi để API Route xử lý
  }
}

// Hàm đóng connection pool (sử dụng khi cần)
export async function closeConnectionPool() {
  if (connectionPool) {
    await connectionPool.end(); // Đóng kết nối pool
    connectionPool = null; // Reset lại connection pool
    console.log('Database connection pool closed');
  }
}
