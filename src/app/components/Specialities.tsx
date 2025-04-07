import React from 'react'
import Image from 'next/image'

const Specialities = () => {
  return (
    <div>
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
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Period doubts or Pregnancy</h3>
              </div>
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
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Acne, pimple or skin issues</h3>
              </div>
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
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Performance issues in bed</h3>
              </div>
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
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Cold, cough or fever</h3>
              </div>
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
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Child not feeling well</h3>
              </div>
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
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Depression or anxiety</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Specialities