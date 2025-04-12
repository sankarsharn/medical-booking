"use client";
import React, { useState } from "react";
import Login from "@/app/components/Login";
import SignUp from "@/app/components/SignUp";

const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {isSignIn ? (
            <Login onSignUp={() => setIsSignIn(false)} />
          ) : (
            <SignUp onSignIn={() => setIsSignIn(true)} />
          )}
        </div>
        {/* Toggle Button */}
        <div className="flex justify-center ">
          <div className="bg-white p-1 rounded-full shadow-md">
            <button
              onClick={() => setIsSignIn(true)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                isSignIn ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                !isSignIn ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AuthPage;