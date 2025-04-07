"use client"

import React from 'react'
import {useState , useEffect} from 'react'
import Image from 'next/image'

const Testimonials = () => {

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

    useEffect(() => {
        const interval = setInterval(() => {
          setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
        }, 5000);
        
        return () => clearInterval(interval);
      }, [testimonials.length]);
    
      // Navigate to specific slide
    const goToSlide = (index: number): void => {
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
    <div>
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
    </div>
  )
}

export default Testimonials