"use client";

import { useEffect, useState } from "react";
import { useDoctorAuthStore } from "@/store/doctorStore";
import { useRouter } from "next/navigation";

interface Doctor {
    _id: string;
    name: string;
    email: string;
    degree: string;
    specialization: string;
    city: string;
    experience: number;
    category: number;
    createdAt: string;
    updatedAt: string;
}

interface Appointment {
    _id: string;
    patient: {
        username: string;
        email: string;
    };
    date: string;
    status: string;
    createdAt: string;
}

export default function DoctorDashboard() {
    const router = useRouter();
    const { doctor } = useDoctorAuthStore((state) => state);
    const id = doctor?.id || "";

    const [doctorData, setDoctorData] = useState<Doctor | null>(null);
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                if (!id) return;

                const docRes = await fetch(`/api/doctor/${id}`);
                const docData = await docRes.json();
                setDoctorData(docData);

                const apptRes = await fetch(`/api/appointment/toDoctor`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ doctorId: id }),
                });
                const { appointments: apptData } = await apptRes.json();
                apptData.sort((a: Appointment, b: Appointment) => new Date(a.date).getTime() - new Date(b.date).getTime());
                setAppointments(apptData);
            } catch (error) {
                console.error("Error fetching dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [id]);

    if (!id) return <p className="text-center mt-10">Invalid access. Doctor ID missing.</p>;
    if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-blue-800">
                    Welcome, Dr. {doctorData?.name}
                </h1>

                {/* Doctor Info */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">Profile Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
                        <p><strong>Email:</strong> {doctorData?.email}</p>
                        <p><strong>Degree:</strong> {doctorData?.degree}</p>
                        <p><strong>Specialization:</strong> {doctorData?.specialization}</p>
                        <p><strong>City:</strong> {doctorData?.city}</p>
                        <p><strong>Experience:</strong> {doctorData?.experience} years</p>
                        <p><strong>Category:</strong> {doctorData?.category}</p>
                    </div>
                </div>

                {/* Appointments */}
                <div className="bg-white rounded-2xl shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-4">All Appointment Requests</h2>
                    {appointments.length === 0 ? (
                        <p className="text-gray-500">No appointments found.</p>
                    ) : (
                        <div className="space-y-4">
                            {appointments.map((appt) => (
                                <div
                                    key={appt._id}
                                    className="border border-blue-100 rounded-xl p-4 hover:shadow-md transition"
                                >
                                    <p className="text-sm sm:text-base text-gray-800">
                                        <strong>Patient:</strong> {appt.patient?.username || "Unknown"} ({appt.patient?.email})
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-800">
                                        <strong>Date:</strong>{" "}
                                        {appt.date ? new Date(appt.date).toDateString() : "Not set"}
                                    </p>
                                    <p className="text-sm sm:text-base text-gray-800">
                                        <strong>Status:</strong>{" "}
                                        <span
                                            className={`inline-block px-2 py-1 rounded text-white text-xs sm:text-sm ${appt.status === "accepted"
                                                ? "bg-green-500"
                                                : appt.status === "rejected"
                                                    ? "bg-red-500"
                                                    : "bg-yellow-500"
                                                }`}
                                        >
                                            {appt.status}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        <strong>Requested At:</strong>{" "}
                                        {appt.date ? new Date(appt.date).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }) : "Not set"}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
