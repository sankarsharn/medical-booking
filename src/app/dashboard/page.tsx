"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from '@/store/authStore';
import { useRouter } from "next/navigation";

interface DoctorInfo {
  name: string;
  specialization: string;
  experience: number;
  city: string;
}

interface Appointment {
  _id: string;
  doctor: DoctorInfo;
  status: string;
  date: string;
  createdAt: string;
}

export default function PatientDashboard() {
  const { user } = useAuthStore((state) => state);
  const router = useRouter();

  const patientId = user?.id || "";
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!patientId) return;

        const res = await fetch("/api/appointment/patient", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patientId }),
        });

        const data = await res.json();
        const sorted = data.appointments.sort(
          (a: Appointment, b: Appointment) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setAppointments(sorted);
      } catch (error) {
        console.error("Failed to fetch appointments", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [patientId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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

  if (!patientId)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-purple-700 mb-2">Access Denied</h2>
          <p className="text-gray-600">Invalid access. Patient ID is missing.</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Return to Login
          </button>
        </div>
      </div>
    );

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="text-center">
        <div className="w-12 h-12 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-purple-700 font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border-b border-purple-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-purple-800 mb-1">
                Welcome, {user?.username}
              </h1>
              <p className="text-purple-600">
                {user?.email}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-3">
              <button
                onClick={() => router.push('/profile/edit')}
                className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-100 transition font-medium"
              >
                Edit Profile
              </button>
              <button
                onClick={() => router.push('/find-doctors')}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition font-medium"
              >
                Find Doctors
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="md:col-span-4">
            {/* Patient Info Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h2 className="text-lg font-semibold text-purple-800 mb-4 border-b pb-2 border-purple-50">
                Your Profile
              </h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex">
                  <span className="text-gray-500 w-24">Username</span>
                  <span className="text-gray-800">{user?.username}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Email</span>
                  <span className="text-gray-800">{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-purple-800 mb-4 border-b pb-2 border-purple-50">
                Appointment Summary
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-opacity-50 border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Pending</span>
                    <span className="text-2xl font-bold text-purple-800">{appointmentCounts.pending}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-opacity-50 border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Accepted</span>
                    <span className="text-2xl font-bold text-purple-800">{appointmentCounts.accepted}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-opacity-50 border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Rejected</span>
                    <span className="text-2xl font-bold text-purple-800">{appointmentCounts.rejected}</span>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-opacity-50 border border-purple-100">
                  <div className="flex justify-between items-center">
                    <span className="text-purple-700">Total</span>
                    <span className="text-2xl font-bold text-purple-800">{appointmentCounts.all}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments Section */}
          <div className="md:col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-purple-800 mb-4">
                  Your Appointments
                </h2>
                
                {/* Filter Tabs */}
                <div className="border-b border-gray-200">
                  <nav className="flex -mb-px">
                    <button
                      onClick={() => setActiveTab('all')}
                      className={`mr-8 py-2 text-sm font-medium ${
                        activeTab === 'all' 
                          ? 'border-b-2 border-purple-500 text-purple-600' 
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
                  {activeTab === 'all' && (
                    <button
                      onClick={() => router.push('/find-doctors')}
                      className="mt-4 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition"
                    >
                      Book Your First Appointment
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAppointments.map((appt) => (
                    <div
                      key={appt._id}
                      className="border border-gray-100 rounded-xl p-4 hover:bg-purple-50 transition duration-300 bg-white"
                    >
                      <div className="flex flex-col md:flex-row md:justify-between">
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
                              Dr. {appt.doctor.name}
                            </h3>
                            <div className="text-sm text-gray-500">
                              <span>{appt.doctor.specialization}</span>
                              <span className="mx-2">•</span>
                              <span>{appt.doctor.city}</span>
                              {appt.doctor.experience && (
                                <>
                                  <span className="mx-2">•</span>
                                  <span>{appt.doctor.experience} years exp.</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center mt-2 text-sm">
                              <span className="mr-3 text-gray-700">{formatDate(appt.date)}</span>
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
                        
                        <div className="mt-3 md:mt-0 md:text-right flex md:block items-center">
                          
                          
                          {appt.status === "accepted" && (
                            <button
                              className="md:mt-2 ml-auto md:ml-0 px-3 py-1 text-xs bg-purple-600 text-white rounded-full hover:bg-purple-700"
                            >
                              View Details
                            </button>
                          )}
                        </div>
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