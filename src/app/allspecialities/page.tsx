'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AllSpecialities = () => {
  const [search, setSearch] = useState('');

  const specialities = [
    { name: "Period doubts or Pregnancy", image: "/api/placeholder/60/60", alt: "Gynecology icon" },
    { name: "Acne, pimple or skin issues", image: "/api/placeholder/60/60", alt: "Dermatology icon" },
    { name: "Performance issues in bed", image: "/api/placeholder/60/60", alt: "Sexual health icon" },
    { name: "Cold, cough or fever", image: "/api/placeholder/60/60", alt: "Cold and fever icon" },
    { name: "Child not feeling well", image: "/api/placeholder/60/60", alt: "Pediatrics icon" },
    { name: "Depression or anxiety", image: "/api/placeholder/60/60", alt: "Mental health icon" },
    { name: "Diabetes management", image: "/api/placeholder/60/60", alt: "Endocrinology icon" },
    { name: "Weight loss or diet", image: "/api/placeholder/60/60", alt: "Nutrition icon" },
    { name: "Thyroid issues", image: "/api/placeholder/60/60", alt: "Thyroid icon" },
    { name: "Heart problems", image: "/api/placeholder/60/60", alt: "Cardiology icon" },
    { name: "Stomach pain or digestion", image: "/api/placeholder/60/60", alt: "Gastroenterology icon" },
    { name: "Kidney or urinary issues", image: "/api/placeholder/60/60", alt: "Urology icon" },
    { name: "Orthopedic problems", image: "/api/placeholder/60/60", alt: "Orthopedics icon" },
    { name: "Eye disorders", image: "/api/placeholder/60/60", alt: "Ophthalmology icon" },
    { name: "Ear, nose, throat issues", image: "/api/placeholder/60/60", alt: "ENT icon" },
    { name: "Neurological disorders", image: "/api/placeholder/60/60", alt: "Neurology icon" },
    { name: "Dental problems", image: "/api/placeholder/60/60", alt: "Dental icon" },
    { name: "COVID-19 related", image: "/api/placeholder/60/60", alt: "COVID-19 icon" },
    { name: "Smoking cessation", image: "/api/placeholder/60/60", alt: "Addiction icon" },
    { name: "Hair fall or baldness", image: "/api/placeholder/60/60", alt: "Hair care icon" }
  ];

  const filteredSpecialities = specialities.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Link href="/" className="text-blue-600 flex items-center mb-4">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-gray-800">All Specialities</h1>
            <p className="text-gray-600 mt-2">Browse and consult with doctors across all medical specialities</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search specialities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Specialities grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {filteredSpecialities.map((specialty, index) => (
            <div key={index} className="flex flex-col items-center bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-blue-100 rounded-full p-4 w-24 h-24 flex items-center justify-center mb-4">
                <Image 
                  src={specialty.image} 
                  width={50} 
                  height={50} 
                  alt={specialty.alt}
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">{specialty.name}</h3>
              </div>
              <button className="text-blue-500 font-medium mt-4 hover:text-blue-700 transition-colors">CONSULT NOW</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllSpecialities;
