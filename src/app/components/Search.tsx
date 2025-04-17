'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useRouter } from 'next/navigation';
import DoctorList from '@/app/components/DoctorList';

const Search = () => {
  // const router = useRouter();

  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState([]);

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
        setDoctors(data);
      } else {
        setError('No doctor found with given details.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
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
            <h1 className="text-4xl font-bold mb-6 text-white">Your home for health</h1>
            <h2 className="text-2xl font-medium mb-10 text-white">Find and Book the Right Doctor</h2>

            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="Specialization (e.g., Surgeon)" 
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      className="w-full py-4 pl-12 pr-4 border-0 focus:ring-0 bg-white text-gray-700"
                    />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input 
                      type="text" 
                      placeholder="City (e.g., Lucknow)" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full py-4 pl-12 pr-4 border-0 focus:ring-0 bg-white text-gray-700"
                    />
                  </div>
                </div>
                
                <div className="bg-white">
                  <button
                    onClick={handleSearch}
                    disabled={loading}
                    className="h-full w-full sm:w-auto bg-blue-600 text-white font-medium px-6 py-4 hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </button>
                </div>
              </div>
            </div>

            {error && <p className="text-red-200 bg-red-500/20 px-4 py-2 rounded-md mb-4">{error}</p>}

            {doctors.length > 0 && (
              <div className="w-full max-w-3xl bg-white rounded-lg p-6 shadow-md mb-8">
                <DoctorList doctors={doctors} />
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-2">
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