import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/appointment.model";
import AppointmentRequest from "@/models/appointmentRequest.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    const {requestId , action} = await req.json();

    const request = await AppointmentRequest.findById(requestId);
    if(!request) {
        return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    if(action.toLowerCase() === "accept") {
        await Appointment.create({
            doctor: request.doctor,
            patient: request.patient,
            date: request.date,        
        });
        request.status = "accepted";
    } else if(action.toLowerCase() === "reject") {
        request.status = "rejected";
    }else {
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    await request.save();
    return NextResponse.json({ message: "Request handled successfully" }, { status: 200 });
}