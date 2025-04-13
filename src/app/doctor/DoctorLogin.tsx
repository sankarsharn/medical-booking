// app/doctor/components/DoctorLogin.tsx
"use client";
import React, { useState } from "react";

interface LoginProps {
  onSignUp: () => void;
}

const DoctorLogin: React.FC<LoginProps> = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted:", formData);
    // Add your login logic here
  };

  // OKLCH color: oklch(0.546 0.245 262.881) converts to a purple color
  const primaryColor = 'rgb(103, 80, 221)';

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          Doctor Login
        </h2>
        <p className="text-gray-500 mt-2">
          Sign in to access your doctor portal
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "rgb(229, 231, 235)" }}
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-medium"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm hover:underline"
              style={{ color: primaryColor }}
            >
              Forgot password?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "rgb(229, 231, 235)" }}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-colors"
          style={{ backgroundColor: primaryColor }}
        >
          Sign In
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Don&apos;t have an account?{" "}
          <button
            onClick={onSignUp}
            className="font-medium hover:underline"
            style={{ color: primaryColor }}
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;