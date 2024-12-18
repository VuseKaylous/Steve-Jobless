import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, phone, password } = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!email || !phone || !password) {
      return res.status(400).json({ message: 'Vui lòng cung cấp đầy đủ thông tin.' });
    }

    try {
      // Kiểm tra xem tài xế với email và số điện thoại có tồn tại không
      const result = await executeQuery(
        'SELECT * FROM drivers WHERE email = ? AND phone_number = ?',
        [email, phone]
      );

      if (result.length === 0) {
        return res.status(400).json({ message: 'Email hoặc số điện thoại không tồn tại.' });
      }

      // Cập nhật mật khẩu mới cho tài xế
      await executeQuery(
        'UPDATE drivers SET password = ? WHERE email = ? AND phone_number = ?',
        [password, email, phone]
      );

      return res.status(200).json({ message: 'Đặt lại mật khẩu thành công.' });
    } catch (error) {
      console.error('Lỗi khi thực thi truy vấn:', error);
      return res.status(500).json({ message: 'Đã xảy ra lỗi hệ thống.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} không được hỗ trợ.` });
  }
}
