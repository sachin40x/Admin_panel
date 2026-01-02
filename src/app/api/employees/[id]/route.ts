import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const [rows]: any = await pool.query('SELECT * FROM employees WHERE id = ?', [params.id]);
        if (rows.length === 0) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }
        return NextResponse.json(rows[0]);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { name, email, phone, department, salary } = await request.json();

        const [result]: any = await pool.query(
            'UPDATE employees SET name = ?, email = ?, phone = ?, department = ?, salary = ? WHERE id = ?',
            [name, email, phone, department, salary, params.id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Employee updated' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        const [result]: any = await pool.query('DELETE FROM employees WHERE id = ?', [params.id]);
        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Employee not found' }, { status: 404 });
        }
        return NextResponse.json({ message: 'Employee deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
