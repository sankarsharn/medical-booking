'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  city: string;
  contact: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  const router = useRouter();

  const handleViewProfile = (id: string) => {
    router.push(`/doctor/${id}`);
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6">Doctors found</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">{doctor.name}</h3>
            <p className="text-gray-600">Specialization: {doctor.specialization}</p>
            <p className="text-gray-600">City: {doctor.city}</p>
            <p className="text-gray-600">Contact: {doctor.contact}</p>

            <button
              onClick={() => handleViewProfile(doctor._id)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
