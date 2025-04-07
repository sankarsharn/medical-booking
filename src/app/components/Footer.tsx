import React from 'react'

const Footer = () => {
  return (
    <div>
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
  )
}

export default Footer