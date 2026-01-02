import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
    try {
        const [rows] = await pool.query('SELECT * FROM employees ORDER BY created_at DESC');
        return NextResponse.json(rows);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { name, email, phone, department, salary } = await request.json();

        if (!name || !email || !phone || !department || !salary) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const [result]: any = await pool.query(
            'INSERT INTO employees (name, email, phone, department, salary) VALUES (?, ?, ?, ?, ?)',
            [name, email, phone, department, salary]
        );

        return NextResponse.json({ id: result.insertId, name, email, phone, department, salary }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
