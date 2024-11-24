// app/api/auth/signup/route.js
export async function POST(request) {
  try {
    const { name, email, password, birthdate, phone_number } = await request.json();

    // Check if email already exists
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new driver
    const result = await executeQuery(
      `INSERT INTO drivers (name, email, password, birthdate, phone_number) 
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, hashedPassword, birthdate, phone_number]
    );

    return NextResponse.json({
      id: result.insertId,
      name,
      email,
      phone_number
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi khi đăng ký' },
      { status: 500 }
    );
  }
}