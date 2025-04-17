import dbConnect from "@/lib/dbConnect";
import AppointmentRequest from "@/models/appointmentRequest.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    const { patientId, doctorId, date } = await req.json();

    if(!doctorId || !patientId || !date) {
        return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const existing = await AppointmentRequest.findOne({ doctor: doctorId, patient: patientId, date: date });
    if(existing) {
        return NextResponse.json({ message: "Appointment already exists" }, { status: 409 });
    }

    const request = await AppointmentRequest.create({ doctor: doctorId, patient: patientId, date });
    return NextResponse.json({ message: "Appointment request created", request }, { status: 201 });
}