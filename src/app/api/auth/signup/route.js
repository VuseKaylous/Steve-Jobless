import { executeQuery } from '@/lib/db'; // Import hàm thực thi truy vấn từ file db.js
import { NextResponse } from 'next/server'; // Import NextResponse để xử lý phản hồi
import bcrypt from 'bcryptjs'; // Import bcrypt để hash mật khẩu

export async function POST(request) {
  try {
    // Lấy dữ liệu từ request body
    const { name, email, password, birthdate, phone_number } = await request.json();

    // Kiểm tra email đã tồn tại chưa
    const checkEmail = await executeQuery(
      'SELECT id FROM drivers WHERE email = ?',
      [email]
    );

    if (checkEmail.length > 0) {
      return NextResponse.json(
        { error: 'Email đã được sử dụng' },
        { status: 400 }
      );
    }

    // Hash mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Thêm người dùng mới vào database
    const result = await executeQuery(
      `INSERT INTO drivers (name, email, password, birthdate, phone_number) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, birthdate, phone_number]
    );

    // Trả về thông tin người dùng mới
    return NextResponse.json({
      id: result.insertId,
      name,
      email,
      phone_number
    });
  } catch (error) {
    // Xử lý lỗi và trả về phản hồi 500
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng ký' },
      { status: 500 }
    );
  }
}
