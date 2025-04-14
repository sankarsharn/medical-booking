// app/doctor/components/DoctorSignUp.tsx
"use client";
import React, { useState } from "react";

interface SignUpProps {
  onSignIn: () => void;
}

const DoctorSignUp: React.FC<SignUpProps> = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    experience: "",
    city: "",
    licenseNumber: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sign up submitted:", formData);
    // Add your sign up logic here
  };

  // OKLCH color: oklch(0.546 0.245 262.881) converts to a purple color
  const primaryColor = 'rgb(103, 80, 221)';

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>
          Doctor Registration
        </h2>
        <p className="text-gray-500 mt-2">
          Create your doctor account to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="specialty"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Specialty
          </label>
          <input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="experience"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Experience (years)
          </label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            min="0"
            required
          />
        </div>

        <div>
          <label
            htmlFor="city"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="licenseNumber"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-colors mt-6"
          style={{ backgroundColor: primaryColor }}
        >
          Create Account
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
          <button
            onClick={onSignIn}
            className="font-medium hover:underline"
            style={{ color: primaryColor }}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default DoctorSignUp;