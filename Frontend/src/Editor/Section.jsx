import { useState } from "react";
import { Document, Page } from "react-pdf";
import React
 from "react";

// Reusable dropdown component
function Section({ title, children, onUpdate, onDownload, showDownload }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border rounded-lg shadow p-4 bg-white space-y-4">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer bg-blue-100 p-3 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <span className="text-blue-600">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Content */}
      {isOpen && <div className="space-y-4">{children}</div>}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onUpdate}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow"
        >
          Update PDF
        </button>
        {showDownload && (
          <button
            onClick={onDownload}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow"
          >
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
}
export default Section