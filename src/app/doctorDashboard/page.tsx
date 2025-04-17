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
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'rejected' | 'all'>('all');

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
        apptData.sort(
          (a: Appointment, b: Appointment) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setAppointments(apptData);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [id]);

  const handleDecision = async (
    requestId: string,
    action: "accept" | "reject"
  ) => {
    try {
      const res = await fetch("/api/appointment/handle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, action }),
      });

      if (res.ok) {
        setAppointments((prev) =>
          prev.map((appt) =>
            appt._id === requestId ? { ...appt, status: action === "accept" ? "accepted" : "rejected" } : appt
          )
        );
      } else {
        console.error("Failed to handle appointment request");
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const filteredAppointments = activeTab === 'all' 
    ? appointments 
    : appointments.filter(appt => appt.status === activeTab);

  const appointmentCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    accepted: appointments.filter(a => a.status === 'accepted').length,
    rejected: appointments.filter(a => a.status === 'rejected').length
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (!id)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-blue-700 mb-2">Access Denied</h2>
          <p className="text-gray-600">Invalid access. Doctor ID is missing.</p>
          <button 
            onClick={() => router.push('/doctor/login')}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
    
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-blue-700 font-medium">Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-b border-blue-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-800 mb-1">
                Welcome, Dr. {doctorData?.name}
              </h1>
              <p className="text-blue-600">
                {doctorData?.specialization} • {doctorData?.experience} years of experience
              </p>
            </div>
            <button 
              onClick={() => router.push('/doctor/profile/edit')}
              className="mt-4 md:mt-0 bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition font-medium"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-4">
            {/* Doctor Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-4 border-b pb-2 border-blue-50">
                Profile Information
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex">
                  <span className="text-gray-500 w-24">Email</span>
                  <span className="text-gray-800">{doctorData?.email}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Degree</span>
                  <span className="text-gray-800">{doctorData?.degree}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Specialty</span>
                  <span className="text-gray-800">{doctorData?.specialization}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Location</span>
                  <span className="text-gray-800">{doctorData?.city}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Experience</span>
                  <span className="text-gray-800">{doctorData?.experience} years</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Category</span>
                  <span className="text-gray-800">{doctorData?.category}</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-blue-800 mb-4 border-b pb-2 border-blue-50">
                Appointment Overview
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-opacity-50 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Pending</span>
                    <span className="text-2xl font-bold text-blue-800">{appointmentCounts.pending}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-opacity-50 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Accepted</span>
                    <span className="text-2xl font-bold text-blue-800">{appointmentCounts.accepted}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-opacity-50 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Rejected</span>
                    <span className="text-2xl font-bold text-blue-800">{appointmentCounts.rejected}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-opacity-50 border border-blue-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-700">Total</span>
                    <span className="text-2xl font-bold text-blue-800">{appointmentCounts.all}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">
                  Appointment Requests
                </h2>
                
                {/* Filter Tabs - More Elegant */}
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`mr-8 py-2 text-sm font-medium ${
                        activeTab === 'all' 
                          ? 'border-b-2 border-blue-500 text-blue-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      All ({appointmentCounts.all})
                    </button>
                    <button
                      onClick={() => setActiveTab('pending')}
                      className={`mr-8 py-2 text-sm font-medium ${
                        activeTab === 'pending' 
                          ? 'border-b-2 border-yellow-500 text-yellow-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Pending ({appointmentCounts.pending})
                    </button>
                    <button
                      onClick={() => setActiveTab('accepted')}
                      className={`mr-8 py-2 text-sm font-medium ${
                        activeTab === 'accepted' 
                          ? 'border-b-2 border-green-500 text-green-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Accepted ({appointmentCounts.accepted})
                    </button>
                    <button
                      onClick={() => setActiveTab('rejected')}
                      className={`mr-8 py-2 text-sm font-medium ${
                        activeTab === 'rejected' 
                          ? 'border-b-2 border-red-500 text-red-600' 
                          : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      Rejected ({appointmentCounts.rejected})
                    </button>
                  </nav>
                </div>
              </div>

              {filteredAppointments.length === 0 ? (
                <div className="text-center py-12 rounded-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-4 text-gray-500">No {activeTab !== 'all' ? activeTab : ''} appointments found.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="border border-gray-100 rounded-xl p-4 hover:bg-blue-50 transition duration-300 bg-white"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-start space-x-3">
                          <div className="mt-1">
                            <div className={`h-3 w-3 rounded-full ${
                              appt.status === 'accepted' 
                                ? 'bg-green-500' 
                                : appt.status === 'rejected'
                                ? 'bg-red-500'
                                : 'bg-yellow-500'
                            }`}></div>
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {appt.patient?.username || "Unknown"}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{appt.patient?.email}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                              <span className="mr-4">{formatDate(appt.date)}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                appt.status === "accepted"
                                  ? "bg-green-100 text-green-800"
                                  : appt.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}>
                                {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {appt.status === "pending" && (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDecision(appt._id, "accept")}
                              className="px-3 py-1.5 text-sm bg-white border border-green-500 text-green-600 rounded-lg hover:bg-green-50"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleDecision(appt._id, "reject")}
                              className="px-3 py-1.5 text-sm bg-white border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}