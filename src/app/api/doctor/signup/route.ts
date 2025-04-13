import Doctor from '@/models/doctor.model';
import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


export async function POST(req: NextRequest) {
    const {name , email , password, degree, specialization, city, experience, license} = await req.json();
    if (!name || !email || !password || !degree || !specialization || !city || !experience || !license) {
        return NextResponse.json({message: 'All fields are required'}, {status: 400});
    }
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    await dbConnect();
    const existingUser = await Doctor.findOne({email});
    if (existingUser) {
        return NextResponse.json({message: 'Email already exists'}, {status: 401});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    let category: Number;
    if(experience <= 5) category = 0;
    else if(experience > 5 && experience <= 10) category = 1;
    else category = 2;
    const newDoctor = new Doctor({
        name, 
        email, 
        password: hashedPassword, 
        degree, 
        specialization, 
        city, 
        experience, 
        license, 
        category});
    await newDoctor.save();
    const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1d'});
    return NextResponse.json({message: 'Signup successful', token}, {status: 201});
}