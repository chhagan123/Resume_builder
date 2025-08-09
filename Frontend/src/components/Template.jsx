import React from "react";
import { Document, Page, pdfjs } from "react-pdf";
// Use '.mjs' worker for Vite/ESM
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     "pdfjs-dist/build/pdf.worker.min.mjs",
//     import.meta.url
//   ).href;
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@5.3.31/build/pdf.worker.min.mjs';


export const Template = () => {
  return (
    <div className="flex justify-center p-6">
      <Document file="/shubham_resume.pdf">
        <Page pageNumber={1} />
      </Document>
    </div>
  );
};
