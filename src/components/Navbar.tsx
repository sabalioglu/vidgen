import React from 'react'
import { Video } from 'lucide-react'

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2 cursor-pointer group">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg group-hover:scale-105 transition-transform duration-200">
              <Video className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI VideoGen
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            <a 
              href="#features" 
              className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              Features
            </a>
            <a 
              href="#pricing" 
              className="px-4 py-2 text-gray-700 hover:text-purple-600 transition-colors duration-200"
            >
              Pricing
            </a>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}