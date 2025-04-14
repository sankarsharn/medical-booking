// app/api/doctors/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Doctor from "@/models/doctor.model";

export async function GET(req: NextRequest) {
  await dbConnect();

  const specialization = req.nextUrl.searchParams.get("specialization");
  const city = req.nextUrl.searchParams.get("city");
  

  if (!city || !specialization) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const doctors = await Doctor.find({
    city: { $regex: new RegExp(`^${city}$`, "i") },
    specialization: { $regex: new RegExp(`^${specialization}$`, "i") },
  });

  return NextResponse.json(doctors);
}
