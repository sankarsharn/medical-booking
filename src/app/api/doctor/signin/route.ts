import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/doctor.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password, license } = await req.json();

    if (!email || !password || !license) {
      return NextResponse.json(
        { message: 'Email, password, and license are required' }, 
        { status: 400 }
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }

    await dbConnect();

    const doctor = await User.findOne({ email });
    if (!doctor) {
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, doctor.password);
    if (!isValid || doctor.license !== license) {
      return NextResponse.json(
        { message: 'Invalid credentials' }, 
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: doctor._id, isAdmin: doctor.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json(
      { 
        message: 'Login successful', 
        user: { 
          id: doctor._id, 
          email: doctor.email, 
          license: doctor.license,
        } 
      },
      { status: 200 }
    );

    response.cookies.set('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    console.error('SignIn Error:', error);
    return NextResponse.json(
      { message: error.message || 'Server error' }, 
      { status: 500 }
    );
  }
}
