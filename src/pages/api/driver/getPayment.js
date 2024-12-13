import { executeQuery } from '@/lib/db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    // Truy vấn dữ liệu từ bảng payment (sử dụng MySQL)
    db.query('SELECT * FROM payments WHERE state = "pending" LIMIT 1', (err, results) => {
      if (err) {
        console.error('Lỗi khi truy vấn MySQL:', err);
        return res.status(500).json({ message: 'Lỗi hệ thống' });
      }

      if (results.length > 0) {
        // Trả về paymentId từ kết quả truy vấn
        return res.status(200).json({ paymentId: results[0].id });
      } else {
        return res.status(404).json({ message: 'Không tìm thấy payment đang chờ xử lý.' });
      }
    });
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} không được hỗ trợ.` });
  }
}
