'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  degree: string;
  specialization: string;
  city: string;
  experience: number;
  category: number;
}

const getFees = (category: number) => {
  switch (category) {
    case 0:
      return { chat: 1, call: 2 };
    case 1:
      return { chat: 2, call: 4 };
    case 2:
      return { chat: 5, call: 10 };
    default:
      return { chat: 0, call: 0 };
  }
};

export default function DoctorProfilePage() {
  const params = useParams();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(`/api/doctor/${doctorId}`);
        if (!res.ok) throw new Error('Failed to fetch doctor');
        const data = await res.json();
        setDoctor(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    if (doctorId) fetchDoctor();
  }, [doctorId]);

  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;
  if (!doctor) return <p className="text-center mt-8">Loading...</p>;

  const { chat, call } = getFees(doctor.category);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">{doctor.name}</h1>

        <div className="grid gap-4 sm:grid-cols-2 text-gray-700 text-lg">
          <p><span className="font-semibold">Email:</span> {doctor.email}</p>
          <p><span className="font-semibold">Degree:</span> {doctor.degree}</p>
          <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
          <p><span className="font-semibold">City:</span> {doctor.city}</p>
          <p><span className="font-semibold">Experience:</span> {doctor.experience} years</p>
        </div>

        <div className="mt-6 text-gray-700 text-lg">
          <h2 className="text-xl font-semibold mb-2">Consultation Fees</h2>
          <ul className="list-disc list-inside">
            <li>Chat: ₹{chat}</li>
            <li>Call: ₹{call}</li>
          </ul>
        </div>

        <div className="mt-10 flex justify-center">
          <button className="px-8 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg hover:bg-blue-700 transition">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
