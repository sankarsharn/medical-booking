import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Search = () => {
  return (
    <div>
      {/* Hero section with full-screen image */}
      <div className="relative w-full h-screen">
        <Image 
          src="/welcome-image.jpeg"
          alt="Welcome Image"
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        
        {/* Overlay for better text visibility */}
        <div className="absolute inset-0 bg-blue-900/70">
          {/* Content centered on the image */}
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl font-bold mb-8 text-white">Your home for health</h1>
            
            <h2 className="text-2xl font-medium mb-8 text-white">Find and Book</h2>
            
            {/* Search bar */}
            <div className="w-full max-w-3xl flex flex-col sm:flex-row mb-8">
              <div className="flex-1 bg-white rounded-md p-3">
                <input 
                  type="text" 
                  placeholder="Search doctors, clinics, hospitals, etc." 
                  className="w-full p-2 outline-none"
                />
              </div>
            </div>
            
            {/* Login and Sign Up buttons */}
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