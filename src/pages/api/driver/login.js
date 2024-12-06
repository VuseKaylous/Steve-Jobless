import { executeQuery } from '@/lib/db';

export default async function handler(req, res) {
  try {
    const { email, password } = req.body;

    const query = 'SELECT id, password, name FROM drivers WHERE email = ?';
    const drivers = await executeQuery(query, [email]);

    if (drivers.length === 0) {
      return res.status(401).json({ error: 'Email không tồn tại' });
    }

    const driver = drivers[0];

    if (password !== driver.password) {
      return res.status(401).json({ error: 'Mật khẩu không đúng' });
    }

    // Don't send password back to client
    const { password: _, ...driverWithoutPassword } = driver;
    
    return res.json(driverWithoutPassword);
  } catch (error) {
    console.error('Lỗi khi đăng nhập:', error);
    return res.status(500).json({ error: 'Lỗi máy chủ nội bộ' });
  }
}