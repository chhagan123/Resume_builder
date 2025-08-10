import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

export const Template = () => {
  const resumes = [
    {
      id: 1,
      title: "Standard",
      path: "/shubham_resume.pdf",
    },
    {
      id: 2,
      title: "Classic",
      path: "/chhagan_resume.pdf",
    },
  ];

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (resume) => {
    setSelectedTemplate(resume);
    alert(`You selected the ${resume.title} template!`);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-bold text-lg mb-6">Select Template</h1>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {resumes.map((resume) => (
          <div
            key={resume.id}
            className="flex flex-col items-center rounded-lg shadow relative group"
          >
            <h2 className="font-semibold mb-2">{resume.title}</h2>

            {/* PDF Container */}
            <div className="border overflow-hidden relative">
              <Document file={resume.path}>
                <Page
                  pageNumber={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  width={550} // Small size so 2 fit on screen
                  className="[&_.react-pdf__Page__textContent]:hidden [&_.react-pdf__Page__annotations]:hidden"
                />
              </Document>

              {/* Hover Select Button */}
              <button
                onClick={() => handleSelect(resume)}
                className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition duration-300`}
              >
                {selectedTemplate?.id === resume.id
                  ? "Selected"
                  : "Select Template"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Template Preview */}
      {selectedTemplate && (
        <div className="mt-8 w-full max-w-2xl">
          <h2 className="font-bold text-center mb-4">
            Selected Template: {selectedTemplate.title}
          </h2>
          <div className="flex justify-center border p-4">
            <Document file={selectedTemplate.path}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                className="[&_.react-pdf__Page__textContent]:hidden [&_.react-pdf__Page__annotations]:hidden"
              />
            </Document>
          </div>
        </div>
      )}
    </div>
  );
};
