"use client"

import * as React from 'react';
// import Link from 'next/link';
import Navbar from '@/app/components/Navbar'; // Importing your navbar component

// Icons for the pricing cards
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const VideoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const DietIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-indigo-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Chat Consultation",
      price: "1",
      icon: <ChatIcon />,
      description: "Text-based consultations with medical professionals for quick advice and follow-ups.",
      features: [
        "Unlimited text chats",
        "Response within 2 hours",
        "Access to chat history",
        "Share images & documents",
        "Prescription via text"
      ],
      ctaText: "Start Chatting",
      popular: false
    },
    {
      name: "Video Consultation",
      price: "2",
      icon: <VideoIcon />,
      description: "Face-to-face video calls with licensed physicians from the comfort of your home.",
      features: [
        "HD video quality",
        "Screen sharing available",
        "Digital prescriptions",
        "15-minute sessions",
        "Same-day appointments",
        "Follow-up included"
      ],
      ctaText: "Book Video Call",
      popular: true
    },
    {
      name: "Diet Plan",
      price: "5",
      icon: <DietIcon />,
      description: "Personalized nutrition plans developed by certified nutritionists for your health goals.",
      features: [
        "Customized meal plans",
        "Nutritional guidance",
        "Weekly diet adjustments",
        "Recipe suggestions",
        "Grocery shopping lists",
        "30-day progress tracking"
      ],
      ctaText: "Get Diet Plan",
      popular: false
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="pt-32 pb-12 bg-indigo-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the plan that fits your healthcare needs. No hidden fees or long-term commitments.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Cards Section */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <div 
                  key={index} 
                  className={`relative rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl transform hover:-translate-y-2 ${
                    plan.popular ? 'border-2 border-indigo-500' : 'border border-gray-200'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-indigo-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                      Popular
                    </div>
                  )}
                  <div className="p-8">
                    <div className="h-20 flex items-center justify-center mb-4">
                      {plan.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex justify-center items-baseline my-4">
                      <span className="text-5xl font-extrabold text-indigo-600">₹{plan.price}</span>
                      <span className="ml-1 text-xl text-gray-500">/session</span>
                    </div>
                    <p className="text-gray-600 text-center mb-6">
                      {plan.description}
                    </p>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckIcon />
                          <span className="ml-3 text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex justify-center">
                      <button 
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          plan.popular 
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                        }`}
                      >
                        {plan.ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Frequently Asked Questions
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:gap-12">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">How do I pay for consultations?</h3>
                  <p className="text-gray-600">We accept all major credit cards, debit cards, and digital payment methods including UPI, PayTM, and other popular options.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I cancel or reschedule my appointment?</h3>
                  <p className="text-gray-600">Yes, you can reschedule or cancel appointments up to 2 hours before the scheduled time at no additional cost.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Are there any additional fees?</h3>
                  <p className="text-gray-600">No hidden fees. The prices listed are all-inclusive. If you need extended sessions, our healthcare providers will inform you of any additional costs.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Is my medical information secure?</h3>
                  <p className="text-gray-600">Absolutely. Our platform is HIPAA-compliant and uses bank-level encryption to ensure your medical data remains private and secure.</p>
                </div>
              </div>
            </div>

            {/* CTA Banner */}
            <div className="mt-20 bg-indigo-600 rounded-2xl p-8 sm:p-12 text-center text-white shadow-xl">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to get started?
              </h3>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-indigo-100">
                Join thousands of patients who trust us with their healthcare needs. Create an account today and experience healthcare on your terms.
              </p>
              <button className="bg-white text-indigo-600 hover:bg-indigo-50 font-bold py-3 px-8 rounded-lg transform transition duration-200 hover:-translate-y-1">
                Create Free Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}