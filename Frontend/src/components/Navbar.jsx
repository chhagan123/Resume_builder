import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
            <span className="text-white font-bold">🤖</span>
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            ResumeAI
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <a href="#templates" className="hover:text-gray-900 transition">
            Templates
          </a>
          <a href="#features" className="hover:text-gray-900 transition">
            Features
          </a>
          <a href="#pricing" className="hover:text-gray-900 transition">
            Pricing
          </a>
          <a href="#about" className="hover:text-gray-900 transition">
            About
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="text-gray-700 hover:text-gray-900 transition">
            Sign In
          </button>
          <button className="px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition">
            Sign Up Free
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-4">
          <a href="#templates" className="block hover:text-gray-900 transition">
            Templates
          </a>
          <a href="#features" className="block hover:text-gray-900 transition">
            Features
          </a>
          <a href="#pricing" className="block hover:text-gray-900 transition">
            Pricing
          </a>
          <a href="#about" className="block hover:text-gray-900 transition">
            About
          </a>

          <div className="pt-4 border-t border-gray-200 space-y-4">
            <button className="block w-full text-left text-gray-700 hover:text-gray-900 transition">
              Sign In
            </button>
            <button className="w-full px-4 py-2 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition">
              Sign Up Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
