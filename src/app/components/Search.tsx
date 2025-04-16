'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import DoctorList from '@/app/components/DoctorList';

const Search = () => {
  const [specialization, setSpecialization] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

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
        setDoctors([]);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Something went wrong.');
      }
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

        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-blue-800/70 to-blue-900/80">
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
              Your Home for Health
            </h1>
            <h2 className="text-xl md:text-2xl font-medium mb-12 text-white/90 drop-shadow">
              Find and Book Your Doctor
            </h2>

            <div
              className={`w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-xl p-1 md:p-2 transition-all duration-300 shadow-lg ${
                isSearchFocused ? 'ring-4 ring-blue-400/50 scale-[1.02]' : ''
              }`}
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 bg-white rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="Specialization (e.g., Surgeon)"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full p-4 outline-none text-blue-900 text-lg"
                  />
                </div>

                <div className="flex-1 bg-white rounded-lg overflow-hidden">
                  <input
                    type="text"
                    placeholder="City (e.g., Lucknow)"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full p-4 outline-none text-blue-900 text-lg"
                  />
                </div>

                <button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 md:min-w-36"
                >
                  {loading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Searching
                    </span>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <span>Search</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-300 mt-4 bg-red-900/30 px-4 py-2 rounded-lg">
                {error}
              </p>
            )}

            {doctors.length > 0 && (
              <div className="w-full max-w-3xl mt-8 bg-white/90 backdrop-blur rounded-lg shadow-lg p-4">
                <DoctorList doctors={doctors} />
              </div>
            )}

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-12">
              <Link
                href="/authentication"
                className="px-8 py-3 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-200 font-medium text-center shadow-md hover:shadow-lg"
              >
                Login
              </Link>
              <Link
                href="/authentication"
                className="px-8 py-3 bg-white text-blue-600 rounded-md cursor-pointer hover:bg-gray-100 transition-all duration-200 font-medium text-center shadow-md hover:shadow-lg"
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
