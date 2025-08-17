
import React from "react";

export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Top section */}
          <div className="grid gap-10 md:grid-cols-4">
            {/* Logo & About */}
            <div>
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="bg-purple-600 text-white px-2 py-1 rounded">⚡</span> ResumeAI
              </h2>
              <p className="text-sm mb-4">
                Create professional resumes that get you hired with our AI-powered builder.
              </p>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700">f</a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700">t</a>
                <a href="#" className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-full hover:bg-gray-700">in</a>
              </div>
            </div>
  
            {/* Product */}
            <div>
              <h3 className="text-white font-semibold mb-3">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">AI Writing</a></li>
                <li><a href="#" className="hover:text-white">Cover Letters</a></li>
              </ul>
            </div>
  
            {/* Resources */}
            <div>
              <h3 className="text-white font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Resume Examples</a></li>
                <li><a href="#" className="hover:text-white">Career Advice</a></li>
                <li><a href="#" className="hover:text-white">Job Search Tips</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
              </ul>
            </div>
  
            {/* Company */}
            <div>
              <h3 className="text-white font-semibold mb-3">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="newone" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
          </div>
  
          {/* Bottom section */}
          <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ResumeAI. All rights reserved. Built by <span className="text-red-500">❤</span> Chhagan Rakhade 
          </div>
        </div>
      </footer>
    );
  }
  