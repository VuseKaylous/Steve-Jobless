import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  try {
    // Thực hiện một câu truy vấn đơn giản
    const SuccessfulTransaction = await executeQuery('SELECT * FROM payments WHERE status = "hoàn thành"');
    const FailedTransaction = await executeQuery('SELECT * FROM payments WHERE status = "lỗi"');
    
    // Trả kết quả về client (JSON)
    res.status(200).json({ SuccessfulTransaction: SuccessfulTransaction, FailedTransaction: FailedTransaction });

    // Đóng kết nối
    await connection.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}