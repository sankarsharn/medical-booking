// app/doctor/DoctorAuthPage.tsx
"use client";
import React, { useState } from "react";
import DoctorLogin from "@/app/doctorAuth/DoctorLogin";
import DoctorSignUp from "@/app/doctorAuth/DoctorSignup";

const DoctorAuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  // OKLCH color: oklch(0.546 0.245 262.881) converts to a purple color
  const primaryColor = 'rgb(103, 80, 221)';

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Toggle Buttons at Top */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-1 rounded-full shadow-md">
            <button
              onClick={() => setIsSignIn(true)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                isSignIn ? "text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              style={{ backgroundColor: isSignIn ? primaryColor : 'transparent' }}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                !isSignIn ? "text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
              style={{ backgroundColor: !isSignIn ? primaryColor : 'transparent' }}
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {isSignIn ? (
            <DoctorLogin onSignUp={() => setIsSignIn(false)} />
          ) : (
            <DoctorSignUp onSignIn={() => setIsSignIn(true)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAuthPage;