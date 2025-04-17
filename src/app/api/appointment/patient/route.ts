import dbConnect from "@/lib/dbConnect";
import AppointmentRequest from "@/models/appointmentRequest.model";
import Doctor from "@/models/doctor.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { patientId } = await req.json();

    if (!patientId) {
      return NextResponse.json({ message: "Patient ID is required" }, { status: 400 });
    }

    const appointments = await AppointmentRequest.find({ patient: patientId })
      .populate("doctor", "name specialization city") // Get doctor details
      .select("status date doctor");

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch appointments" }, { status: 500 });
  }
}
