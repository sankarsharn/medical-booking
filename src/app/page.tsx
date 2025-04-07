"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  // State for testimonial carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Patient",
      image: "/api/placeholder/64/64",
      quote: "This platform made it so easy to find a specialist for my condition. I got an appointment within 24 hours and the doctor was excellent!"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Cardiologist",
      image: "/api/placeholder/64/64",
      quote: "As a healthcare provider, this platform has transformed how I connect with patients. The scheduling system is seamless and the video consultation features are reliable."
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Mother of two",
      image: "/api/placeholder/64/64",
      quote: "When my child got sick at night, I was able to consult with a pediatrician immediately. The peace of mind this service provides is invaluable."
    },
    {
      id: 4,
      name: "James Wilson",
      role: "Regular user",
      image: "/api/placeholder/64/64",
      quote: "I've been managing my chronic condition through regular online check-ins. The doctors are knowledgeable and the platform remembers my history."
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Navigate to specific slide
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Next slide function
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Previous slide function
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section with full-screen image */}
      <div className="relative w-full h-screen">
        <Image 
          src="/welcome-image.jpeg"  // Place your image in the public folder
          alt="Welcome Image"
          fill
          sizes="100vw"
          priority  // For LCP improvement since this is the main image
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
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium">
                Login
              </button>
              <button className="px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-colors font-medium">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Doctor Specialties Section */}
      <div className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Consult top doctors online for any health concern</h2>
              <p className="text-gray-600 mt-2">Private online consultations with verified doctors in all specialists</p>
            </div>
            <button className="mt-4 md:mt-0 border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
              View All Specialities
            </button>
          </div>
          
          {/* Specialties grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Specialty 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <Image 
                  src="/api/placeholder/60/60" 
                  width={60} 
                  height={60} 
                  alt="Gynecology icon"
                />
              </div>
              <h3 className="text-center font-medium">Period doubts or Pregnancy</h3>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
            
            {/* Specialty 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <Image 
                  src="/api/placeholder/60/60" 
                  width={60} 
                  height={60} 
                  alt="Dermatology icon"
                />
              </div>
              <h3 className="text-center font-medium">Acne, pimple or skin issues</h3>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
            
            {/* Specialty 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <Image 
                  src="/api/placeholder/60/60" 
                  width={60} 
                  height={60} 
                  alt="Sexual health icon"
                />
              </div>
              <h3 className="text-center font-medium">Performance issues in bed</h3>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
            
            {/* Specialty 4 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <Image 
                  src="/api/placeholder/60/60" 
                  width={60} 
                  height={60} 
                  alt="Cold and fever icon"
                />
              </div>
              <h3 className="text-center font-medium">Cold, cough or fever</h3>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
            
            {/* Specialty 5 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <Image 
                  src="/api/placeholder/60/60" 
                  width={60} 
                  height={60} 
                  alt="Pediatrics icon"
                />
              </div>
              <h3 className="text-center font-medium">Child not feeling well</h3>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
            
            {/* Specialty 6 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <Image 
                  src="/api/placeholder/60/60" 
                  width={60} 
                  height={60} 
                  alt="Mental health icon"
                />
              </div>
              <h3 className="text-center font-medium">Depression or anxiety</h3>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonial Section with Horizontal Slider */}
      <div className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Section heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">What our users say</h2>
            <p className="text-gray-600 mt-2">Hear from patients and doctors who use our platform</p>
          </div>
          
          {/* Testimonial carousel */}
          <div className="relative">
            {/* Carousel container */}
            <div className="overflow-hidden">
              {/* Slides container */}
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white p-8 rounded-lg shadow-md">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">
                          <Image 
                            src={testimonial.image} 
                            width={64} 
                            height={64} 
                            alt={testimonial.name}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{testimonial.name}</h3>
                          <p className="text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation arrows */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              aria-label="Previous testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
              aria-label="Next testimonial"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="font-bold text-lg mb-4">About Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">About Our Platform</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Press & Media</a></li>
              </ul>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className="font-bold text-lg mb-4">For Patients</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Find Doctors</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Book Appointments</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Video Consultations</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Health Articles</a></li>
              </ul>
            </div>
            
            {/* Column 3 */}
            <div>
              <h3 className="font-bold text-lg mb-4">For Doctors</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-300 transition-colors">Join as a Doctor</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Practice Management</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Telemedicine Software</a></li>
                <li><a href="#" className="hover:text-blue-300 transition-colors">Resources</a></li>
              </ul>
            </div>
            
            {/* Column 4 */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li>Email: support@healthplatform.com</li>
                <li>Phone: +1 (800) 123-4567</li>
                <li className="mt-4">
                  <div className="flex space-x-4">
                    <a href="#" className="hover:text-blue-300 transition-colors">Facebook</a>
                    <a href="#" className="hover:text-blue-300 transition-colors">Twitter</a>
                    <a href="#" className="hover:text-blue-300 transition-colors">Instagram</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-blue-800 mt-8 pt-8 flex flex-col md:flex-row justify-between">
            <p>&copy; 2025 Health Platform. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-blue-300 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}