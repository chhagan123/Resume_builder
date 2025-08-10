import React, { useState } from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";


function EditResume() {
  const [name, setName] = useState("chhagan Rakhade");
  const [pdfUrl, setPdfUrl] = useState(null);

  // Generate the updated PDF based on current name
  const generatePdf = async () => {
    try {
      const res = await fetch("/Resume_temp.pdf");
      if (!res.ok) throw new Error("Template fetch failed");
      const existingPdfBytes = await res.arrayBuffer();

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      const { width, height } = firstPage.getSize();
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      firstPage.drawText(name, {
        x: 50,
        y: height - 100,
        size: 18,
        font: font,
        color: rgb(0, 0, 0),
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
    } catch (e) {
      console.error("PDF Generation Error", e);
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left side form */}
      <div style={{
        flex: 1,
        padding: "20px",
        borderRight: "1px solid #ccc",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start"
      }}>
        <h2>Resume Builder</h2>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            display: "block",
            padding: "10px",
            marginTop: "10px",
            width: "100%"
          }}
        />
        <button
          onClick={generatePdf}
          style={{
            marginTop: "16px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Update PDF
        </button>
      </div>

      {/* Right side PDF preview */}
      <div style={{
        flex: 2,
        padding: "20px",
        overflow: "auto",
        backgroundColor: "#f4f4f4",
        boxSizing: "border-box"
      }}>
        {pdfUrl && (
          <Document file={pdfUrl}>
            <Page pageNumber={1} width={500} />
          </Document>
        )}
      </div>
    </div>
  );
}

export default EditResume;
