// /app/api/appointment/byDoctor/route.ts
import dbConnect from "@/lib/dbConnect";
import AppointmentRequest from "@/models/appointmentRequest.model";
import Patient from "@/models/user.models";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { doctorId } = await req.json();

    if (!doctorId) {
      return NextResponse.json({ message: "Doctor ID is required" }, { status: 400 });
    }

    const appointments = await AppointmentRequest.find({ doctor: doctorId })
      .populate("patient", "username email") // Get patient info
      .select("status date patient");

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch appointments" }, { status: 500 });
  }
}
