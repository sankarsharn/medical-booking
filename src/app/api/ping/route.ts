// src/app/api/ping/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';

export async function GET() {
  try {
    await dbConnect();
    return NextResponse.json({ message: 'Connected to MongoDB ✅' });
  } catch (err) {
    return NextResponse.json(
      { message: 'Failed to connect to MongoDB ❌' },
      { status: 500 }
    );
  }
}
