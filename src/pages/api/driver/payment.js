import { executeQuery } from '@/lib/db';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: 'Thiếu paymentId' });
    }

    // Cập nhật trạng thái payment trong DB
    db.query(
      'UPDATE payments SET state = "complete" WHERE id = ?',
      [paymentId], // Sử dụng placeholder "?" để tránh SQL injection
      (err, results) => {
        if (err) {
          console.error('Lỗi khi cập nhật trạng thái payment:', err);
          return res.status(500).json({ message: 'Lỗi hệ thống' });
        }

        if (results.affectedRows > 0) {
          return res.status(200).json({ message: 'Xác nhận thanh toán thành công' });
        } else {
          return res.status(404).json({ message: 'Không tìm thấy payment để cập nhật' });
        }
      }
    );
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} không được hỗ trợ.` });
  }
}
