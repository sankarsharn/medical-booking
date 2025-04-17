"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDoctorAuthStore } from "@/store/doctorStore";

interface LoginProps {
  onSignUp: () => void;
}

const DoctorLogin: React.FC<LoginProps> = ({ onSignUp }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    license: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
    const login = useDoctorAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.email || !formData.password || !formData.license) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/doctor/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }
      login(data.user);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/doctorDashboard");
      }, 1000);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || "An error occurred during login");
      } else {
        setError("An error occurred during login");
      }
    } finally {
      setLoading(false);
    }
  };

  const primaryColor = "rgb(103, 80, 221)";

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

      {/* Error Message */}
      {error && (
        <div className="mb-4 text-red-600 text-sm text-center">{error}</div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 text-green-600 text-sm text-center">{success}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
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

        <div className="mb-4">
          <label
            htmlFor="license"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            License No.
          </label>
          <input
            type="text"
            id="license"
            name="license"
            value={formData.license}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
            style={{ borderColor: "rgb(229, 231, 235)" }}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg text-white font-medium hover:opacity-90 transition-colors ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          style={{ backgroundColor: primaryColor }}
        >
          {loading ? "Signing In..." : "Sign In"}
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
