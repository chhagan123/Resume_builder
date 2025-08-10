import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="bg-[#EFF2F9] py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 md:px-12">
        {/* Left Side - Text */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            2025's Top Resume Templates
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Build your resume in as little as{" "}
            <span className="text-orange-500 font-semibold">5 minutes</span>
            using our recruiter-approved templates and pre-written examples.
          </p>
          <Link
            to="/template"
            className="bg-orange-500 text-white px-6 py-3 rounded font-semibold hover:bg-orange-600 transition"
          >
            Build Your Resume For Free
          </Link>
          <p className="text-orange-500 mt-3">No credit card required</p>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 mt-10 md:mt-0 flex justify-center">
          <img
            src="/img/Resume_template.webp"
            alt="Resume Preview"
            className="max-w-sm md:max-w-md shadow-lg rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};
