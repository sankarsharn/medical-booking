"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface SignUpProps {
  onSignIn: () => void;
}

const DoctorSignUp: React.FC<SignUpProps> = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    degree: "",
    specialization: "",
    city: "",
    experience: "",
    license: "",
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/doctor/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          experience: Number(formData.experience), // backend expects number
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully!");
      router.push("/doctor");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  const primaryColor = "rgb(103, 80, 221)";

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
        {[
          { label: "Full Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Password", name: "password", type: "password" },
          { label: "Degree", name: "degree", type: "text" },
          { label: "Specialization", name: "specialization", type: "text" },
          { label: "City", name: "city", type: "text" },
          { label: "Experience (years)", name: "experience", type: "number" },
          { label: "License Number", name: "license", type: "text" },
        ].map((field) => (
          <div key={field.name}>
            <label
              htmlFor={field.name}
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              {field.label}
            </label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={(formData as never)[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-colors mt-6"
          style={{ backgroundColor: primaryColor }}
        >
          Create Account
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mt-2">{success}</p>}
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
