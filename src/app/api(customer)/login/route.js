import { executeQuery } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const query = 'SELECT id, password, name FROM customers WHERE email = ?';
        const customers = await executeQuery(query, [email]);

        if (customers.length === 0) {
            return NextResponse.json(
                { error: 'Email không tồn tại' },
                { status: 401 }
            );
        }

        const customer = customer[0];
        const passwordMatch = await bcrypt.compare(password, customer.password);

        if (!passwordMatch) {
            return NextResponse.json(
                { error: 'Mật khẩu không đúng' },
                { status: 401 }
            );
        }

        // Don't send password back to client
        const { password: _, ...customerWithoutPassword } = customer;

        return NextResponse.json(customerWithoutPassword);
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Đã xảy ra lỗi khi đăng nhập' },
            { status: 500 }
        );
    }
}