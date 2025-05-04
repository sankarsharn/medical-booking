/* eslint-disable @next/next/no-img-element */
import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Image from 'next/image';
import Link from 'next/link';

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
            {/* Updated link to ensure routing works correctly */}
            <Link href="/allspecialities">
              <button className="mt-4 md:mt-0 border border-blue-500 text-blue-500 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                View All Specialities
              </button>
            </Link>
          </div>
          
          {/* Specialties grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Specialty 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
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
              <div className="bg-red-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Dermatology icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Skin and Hair Issues</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60}
                  height={60} 
                  alt="Child health icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Child Health Issues</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 4 */}
            <div className="flex flex-col items-center">
              <div className="bg-yellow-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="General medicine icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Cold, Cough & Fever</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 5 */}
            <div className="flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Mental health icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Mental Wellness</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 6 */}
            <div className="flex flex-col items-center">
              <div className="bg-pink-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Diet icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Weight Management</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 7 */}
            <div className="flex flex-col items-center">
              <div className="bg-indigo-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Orthopedic icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Bones & Joints</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 8 */}
            <div className="flex flex-col items-center">
              <div className="bg-teal-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Dental icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Dental Care</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 9 */}
            <div className="flex flex-col items-center">
              <div className="bg-orange-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Cardiology icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Heart Health</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 10 */}
            <div className="flex flex-col items-center">
              <div className="bg-cyan-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="ENT icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Ear, Nose & Throat</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 11 */}
            <div className="flex flex-col items-center">
              <div className="bg-lime-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="Ophthalmology icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">Eye Health</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>

            {/* Specialty 12 */}
            <div className="flex flex-col items-center">
              <div className="bg-rose-100 rounded-full p-4 w-32 h-32 flex items-center justify-center mb-4">
                <img 
                  src="https://www.svgrepo.com/show/8461/doctor.svg" 
                  width={60} 
                  height={60} 
                  alt="General physician icon"
                />
              </div>
              <div className="h-12 flex items-center">
                <h3 className="text-center font-medium">General Physician</h3>
              </div>
              <button className="text-blue-500 font-medium mt-2">CONSULT NOW</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specialities;