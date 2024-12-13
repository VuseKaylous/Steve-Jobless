import { connectToDatabase } from '../../utils/db'; 

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { paymentId } = req.body;

    if (!paymentId) {
      return res.status(400).json({ message: 'Thiếu paymentId' });
    }

    try {
      const { db } = await connectToDatabase();
      const result = await db.collection('payments').updateOne(
        { _id: paymentId },
        { $set: { state: 'complete' } }
      );

      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: 'Xác nhận thành công' });
      } else {
        return res.status(400).json({ message: 'Không tìm thấy payment' });
      }
    } catch (error) {
      console.error('Database error:', error);
      return res.status(500).json({ message: 'Lỗi hệ thống' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} không được hỗ trợ` });
  }
}
