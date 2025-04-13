"use client"

import * as React from 'react';
// import Link from 'next/link';
import Navbar from '@/app/components/Navbar'; // Updated import to use your Navbar component

// Icons (using simple SVG components instead of MUI)
const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const NutritionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const SpecialistIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function ServicesPage() {
  const services = [
    {
      title: "Video Call with Doctor",
      description: "Connect face-to-face with licensed physicians from the comfort of your home. Get diagnosed, receive treatment plans, and get prescriptions when necessary.",
      icon: <VideoIcon />,
      cta: "Schedule a Call"
    },
    {
      title: "Chat with Doctor",
      description: "Quick text-based consultations with medical professionals. Ideal for follow-ups, minor concerns, or when you need medical advice on the go.",
      icon: <ChatIcon />,
      cta: "Start Chatting"
    },
    {
      title: "Nutritionist Consultation",
      description: "Work with certified nutritionists to develop personalized meal plans, address dietary concerns, and achieve your health and wellness goals.",
      icon: <NutritionIcon />,
      cta: "Meet a Nutritionist"
    },
    {
      title: "Specialist Referrals",
      description: "Get connected with the right specialists for your specific health needs through our network of trusted healthcare providers.",
      icon: <SpecialistIcon />,
      cta: "Find a Specialist"
    }
  ];

  const reasons = [
    "24/7 availability for urgent medical concerns",
    "Board-certified physicians and healthcare providers",
    "Secure and HIPAA-compliant platform",
    "No waiting rooms or appointment delays",
    "Affordable pricing with transparent fee structure",
    "Seamless prescription delivery to your pharmacy of choice",
    "Personalized care plans designed for your specific needs",
    "Easy access to your medical records and visit history"
  ];

  return (
    <>
      <Navbar />
      <div className="pt-32 pb-20 bg-gray-50">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our Healthcare Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Connect with healthcare professionals on your terms, anytime and anywhere.
            </p>
          </div>

          {/* Services Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="flex justify-center mb-6">
                    {service.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 text-center mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex justify-center">
                    <button 
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transform transition duration-200 hover:-translate-y-1"
                    >
                      {service.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="mb-16">
            <div className="border-t border-gray-200 mb-16"></div>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Us
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckIcon />
                  <p className="text-gray-700 font-medium">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-indigo-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to prioritize your health?
            </h3>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-indigo-100">
              Join thousands of patients who trust us with their healthcare needs. Get started today!
            </p>
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-lg transform transition duration-200 hover:-translate-y-1">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}