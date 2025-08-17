import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Brain, FileText, Download, Link as LinkIcon } from "lucide-react";

const Home = () => {
  // Resume carousel state
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3; // show only 3 templates at a time

  const handleNext = () => {
    if (startIndex + visibleCount < templates.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Data
  const images = [
    { id: 1, src: "/img/gogle.png" },
    { id: 2, src: "/img/air.png" },
    { id: 3, src: "/img/ibm.jpg" },
    { id: 4, src: "/img/micro.jpg" },
    { id: 5, src: "/img/amazon.webp" },
  ];

  const features = [
    {
      id: 1,
      icon: <Brain className="h-10 w-10 text-blue-500" />,
      title: "Create Unlimited Resumes",
      description: "Create as many resumes as you need without any restrictions.",
    },
    {
      id: 2,
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "Customizable Resume Templates",
      description: "Choose from 50+ recruiter-approved templates designed to get you hired.",
    },
    {
      id: 3,
      icon: <LinkIcon className="h-10 w-10 text-green-500" />,
      title: "Create Shareable Web Links",
      description: "Share your resume instantly with a professional web link.",
    },
    {
      id: 4,
      icon: <Download className="h-10 w-10 text-orange-500" />,
      title: "Download your PDF resume",
      description: "Get your resume as a perfect PDF ready for any application.",
    },
  ];

  const templates = [
    { id: 1, src: "/template/images.jpg" },
    { id: 2, src: "/template/images2.jpg" },
    { id: 3, src: "/template/images3.svg" },
    { id: 4, src: "/template/images4.webp" },
    { id: 5, src: "/template/images5.jpg" },
  ];

  const steps = [
    {
      id: 1,
      color: "bg-blue-500",
      title: "Select resume template",
      desc: "Choose from our collection of professionally designed templates that are loved by recruiters.",
    },
    {
      id: 2,
      color: "bg-purple-500",
      title: "Add your details",
      desc: "Our templates will automatically format your information into a beautiful resume layout.",
    },
    {
      id: 3,
      color: "bg-green-500",
      title: "Download your resume",
      desc: "Once you are happy with your resume, create a shareable link or download as PDF.",
    },
  ];

  return (
    <div>
      {/* ---------------- Hero Section ---------------- */}
      <section className="px-8 py-16 flex flex-col lg:flex-row items-center justify-between w-full mx-auto bg-gradient-to-b from-gray-50 to-purple-50">
        {/* Left Content */}
        <div className="max-w-lg">
          <span className="inline-flex items-center text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
            AI-Powered Resume Builder
          </span>

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
            Make your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              resume
            </span>{" "}
            as impressive as your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">
              skills
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-6">
            Create professional, ATS-friendly resumes that recruiters love. Our
            AI helps you craft compelling content and choose the perfect design.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/edit"
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg font-medium hover:opacity-90 transition"
            >
              ▶ Create My Resume
            </Link>
            <Link
              to="/template"
              className="border border-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            >
              View Templates
            </Link>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-orange-500"></div>
            </div>
            Trusted by 50,000+ users
            <span className="flex items-center ml-2 text-yellow-500">★★★★★</span>
            <span className="text-gray-600">4.9/5 rating</span>
          </div>
        </div>

        {/* Right Image */}
        <div className="mt-10 lg:mt-0 lg:ml-10">
          <img
            src="https://images.unsplash.com/photo-1581091870675-6279abf70a00"
            alt="Resume Preview"
            className="rounded-2xl shadow-xl w-full max-w-md"
          />
        </div>
      </section>

      {/* ---------------- Trusted Companies ---------------- */}
      <section className="flex flex-col items-center gap-4 py-12 border-b border-gray-200">
        <h1 className="font-semibold text-lg">
          Trusted by job seekers at top companies
        </h1>
        <div className="flex flex-wrap justify-center gap-6">
          {images.map((img) => (
            <img
              key={img.id}
              src={img.src}
              alt={`logo-${img.id}`}
              className="h-12 w-20 object-contain"
            />
          ))}
        </div>
      </section>

      {/* ---------------- Features ---------------- */}
      <section className="px-6 py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Give your resume the{" "}
            <span className="text-blue-600">competitive edge</span>
          </h2>
          <p className="text-gray-500 mt-4">
            Our AI-powered tools help you create resumes that stand out and get
            you hired faster.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Templates Carousel ---------------- */}
      <section className="flex flex-col items-center w-full py-16 bg-gradient-to-r from-[#0A1631] to-[#0E2A70]">
        <h1 className="font-bold text-white text-4xl text-center">
          Choose templates approved by recruiters
        </h1>
        <h2 className="text-white text-lg md:text-2xl text-center mt-4">
          We have analyzed thousands of resumes and created templates that get
          you hired at top companies.
        </h2>

        {/* Resume Row */}
        <div className="flex gap-6 items-center mt-10">
          {templates.slice(startIndex, startIndex + visibleCount).map((temp) => (
            <button
              key={temp.id}
              className="w-64 h-80 border-2 border-gray-300 bg-white rounded-lg shadow hover:border-blue-500 transition"
              onClick={() => alert(`Clicked Resume ${temp.id}`)}
            >
              <img
                src={temp.src}
                alt={`Resume ${temp.id}`}
                className="w-full h-full object-cover rounded"
              />
            </button>
          ))}
        </div>

        {/* Carousel Navigation */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + visibleCount >= templates.length}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </section>

      {/* ---------------- Steps ---------------- */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Effortlessly make a job-worthy resume in three easy steps!
        </h2>

        <div className="grid gap-10 md:gap-6 md:grid-cols-3 text-center">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div
                className={`${step.color} text-white w-16 h-16 flex items-center justify-center rounded-full text-xl font-bold mb-4`}
              >
                {step.id}
              </div>
              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
