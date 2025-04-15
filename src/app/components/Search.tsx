'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import DoctorList from '@/app/components/DoctorList';  // Import the new DoctorList component

const Search = () => {
  const router = useRouter();

  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState([]); // To store the list of doctors

  const handleSearch = async () => {
    if (!specialization || !city) {
      setError('Please enter both specialization and city.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(
        `/api/doctor/search?specialization=${specialization}&city=${city}`
      );

      if (!res.ok) throw new Error('Search failed');

      const data = await res.json();

      if (data.length > 0) {
        setDoctors(data); // Store the list of doctors
      } else {
        setError('No doctor found with given details.');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="relative w-full h-screen">
        <Image 
          src="/welcome-image.jpeg"
          alt="Welcome Image"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        
        <div className="absolute inset-0 bg-blue-900/70">
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl font-bold mb-8 text-white">Your home for health</h1>
            <h2 className="text-2xl font-medium mb-8 text-white">Find and Book</h2>

            <div className="w-full max-w-3xl flex flex-col sm:flex-row gap-4 mb-6">
              <input 
                type="text" 
                placeholder="Specialization (e.g., Surgeon)" 
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                className="flex-1 p-3 rounded-md outline-none"
              />
              <input 
                type="text" 
                placeholder="City (e.g., Lucknow)" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="flex-1 p-3 rounded-md outline-none"
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="bg-white text-blue-600 font-medium px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {error && <p className="text-red-400 mb-4">{error}</p>}

            {/* Pass the list of doctors as a prop to the DoctorList component */}
            {doctors.length > 0 && <DoctorList doctors={doctors} />}
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/authentication"
                className="px-6 py-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors font-medium text-center"
              >
                Login
              </Link>
              <Link 
                href="/authentication"
                className="px-6 py-3 bg-white text-blue-600 rounded-md cursor-pointer hover:bg-gray-100 transition-colors font-medium text-center"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
