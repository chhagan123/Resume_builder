import React, { useState } from "react";
import { PDFDocument, StandardFonts, rgb, PDFArray, PDFName } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function EditResume() {
  const [name, setName] = useState("chhagan Rakhade");
  const [location, setLocation] = useState("Nagpur, Maharashtra");
  const [phone, setPhone] = useState("9158396794");
  const [email, setEmail] = useState("chhaganrakhade7@gmail.com");
  const [github, setGithub] = useState("https://github.com/username");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/username");
  const [portfolio, setPortfolio] = useState("https://myportfolio.com");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);

  // Safe icon loader that supports PNG/JPG
  const loadIcon = async (pdfDoc, path) => {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Icon not found: ${path}`);
    const bytes = await res.arrayBuffer();
  
    // Check format from extension and file header bytes
    const ext = path.split('.').pop().toLowerCase();
    const header = new Uint8Array(bytes).slice(0, 8); // Get initial bytes
    const isPng = ext === "png" && header[0] === 0x89 &&
      header[1] === 0x50 && header[2] === 0x4E &&
      header[3] === 0x47 && header[4] === 0x0D &&
      header[5] === 0x0A && header[6] === 0x1A &&
      header[7] === 0x0A;
    const isJpg = (ext === "jpg" || ext === "jpeg") && header[0] === 0xFF && header[1] === 0xD8;
  
    if (isPng) {
      return await pdfDoc.embedPng(bytes);
    } else if (isJpg) {
      return await pdfDoc.embedJpg(bytes);
    } else {
      throw new Error(`Unsupported or corrupt image format: ${path}`);
    }
  };

  const generatePdf = async () => {
    try {
      const res = await fetch("/Resume_temp.pdf");
      if (!res.ok) throw new Error("Template fetch failed");
      const existingPdfBytes = await res.arrayBuffer();

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const firstPage = pdfDoc.getPages()[0];
      const { width: pageWidth, height: pageHeight } = firstPage.getSize();

      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const normalFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

      /** --- NAME --- **/
      firstPage.drawText(name, {
        x: pageWidth / 2 - boldFont.widthOfTextAtSize(name, 20) / 2,
        y: pageHeight - 50,
        size: 20,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      /** --- HEADER ROW --- **/
      const iconSize = 12;
      const gap = 2;
      const separator = "  |  ";
      const fontSize = 8;
      const separatorWidth = normalFont.widthOfTextAtSize(separator, fontSize);

      // Load icons safely
      const locationIcon = await loadIcon(pdfDoc, "/icons/location.png");
      const phoneIcon = await loadIcon(pdfDoc, "/icons/phone.png");
      const emailIcon = await loadIcon(pdfDoc, "/icons/email.png");
      const githubIcon = await loadIcon(pdfDoc, "/icons/github.png");
      const linkedinIcon = await loadIcon(pdfDoc, "/icons/linkedin.png");
      const portfolioIcon = await loadIcon(pdfDoc, "/icons/portfolio.png");

      const items = [
        { label: location, icon: locationIcon, url: null },
        { label: phone, icon: phoneIcon, url: null },
        { label: email, icon: emailIcon, url: email ? `mailto:${email}` : null },
        { label: "GitHub", icon: githubIcon, url: github },
        { label: "LinkedIn", icon: linkedinIcon, url: linkedin },
        { label: "Portfolio", icon: portfolioIcon, url: portfolio },
      ];

      const totalWidth = items.reduce((sum, item, idx) => {
        const labelWidth = normalFont.widthOfTextAtSize(item.label, fontSize);
        sum += iconSize + gap + labelWidth;
        if (idx < items.length - 1) sum += separatorWidth;
        return sum;
      }, 0);

      let currentX = (pageWidth / 2) - (totalWidth / 2);
      const rowY = pageHeight - 75;

      let annotsRef = firstPage.node.get(PDFName.of("Annots"));
      let annots;
      if (annotsRef) {
        annots = pdfDoc.context.lookup(annotsRef, PDFArray);
      } else {
        annots = pdfDoc.context.obj([]);
        firstPage.node.set(PDFName.of("Annots"), annots);
      }

      items.forEach((item, i) => {
        // Icon
        firstPage.drawImage(item.icon, {
          x: currentX,
          y: rowY - 1,
          width: iconSize,
          height: iconSize,
        });

        currentX += iconSize + gap;
        const labelWidth = normalFont.widthOfTextAtSize(item.label, fontSize);

        // Text
        firstPage.drawText(item.label, {
          x: currentX,
          y: rowY,
          size: fontSize,
          font: normalFont,
          color: item.url ? rgb(0, 0, 1) : rgb(0, 0, 0),
        });

        // Underline for links
        if (item.url) {
          firstPage.drawLine({
            start: { x: currentX, y: rowY - 2 },
            end: { x: currentX + labelWidth, y: rowY - 2 },
            thickness: 0.5,
            color: rgb(0, 0, 1),
          });

          // Clickable annotation
          const linkAnnotation = pdfDoc.context.obj({
            Type: "Annot",
            Subtype: "Link",
            Rect: [currentX, rowY, currentX + labelWidth, rowY + fontSize],
            Border: [0, 0, 0],
            A: pdfDoc.context.obj({
              Type: "Action",
              S: "URI",
              URI: item.url,
            }),
          });
          annots.push(linkAnnotation);
        }

        currentX += labelWidth;

        if (i < items.length - 1) {
          firstPage.drawText(separator, {
            x: currentX,
            y: rowY,
            size: fontSize,
            font: normalFont,
            color: rgb(0, 0, 0),
          });
          currentX += separatorWidth;
        }
      });

      /** --- SAVE & PREVIEW --- **/
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
      const pdfBytesOut = await pdfDoc.save();
      const blob = new Blob([pdfBytesOut], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      setPdfBytes(pdfBytesOut);
      setPdfUrl(url);
    } catch (err) {
      console.error("PDF Generation Error", err);
    }
  };

  const downloadPdf = () => {
    if (!pdfBytes) return;
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name.replace(/\s+/g, "_")}_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left form */}
      <div className="w-1/3 p-6 border-r border-gray-300 bg-white flex flex-col shadow-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>

        <label className="text-sm font-medium text-gray-600">Full Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <label className="text-sm font-medium text-gray-600">Location</label>
        <input value={location} onChange={(e) => setLocation(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <label className="text-sm font-medium text-gray-600">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <label className="text-sm font-medium text-gray-600">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <label className="text-sm font-medium text-gray-600">GitHub URL</label>
        <input value={github} onChange={(e) => setGithub(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <label className="text-sm font-medium text-gray-600">LinkedIn URL</label>
        <input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <label className="text-sm font-medium text-gray-600">Portfolio URL</label>
        <input value={portfolio} onChange={(e) => setPortfolio(e.target.value)} className="border rounded-lg px-4 py-2 w-full" />

        <div className="flex gap-2">
          <button onClick={generatePdf} className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow">
            Update PDF
          </button>
          {pdfBytes && (
            <button onClick={downloadPdf} className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow">
              Download PDF
            </button>
          )}
        </div>
      </div>

      {/* PDF preview */}
      <div className="w-2/3 p-6 overflow-auto">
        {pdfUrl ? (
          <div className="border rounded-lg shadow bg-white p-4 flex justify-center">
            <Document file={pdfUrl}>
              <Page pageNumber={1} renderTextLayer={false} renderAnnotationLayer={true} />
            </Document>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 italic">
            No PDF generated yet — enter details and click "Update PDF"
          </div>
        )}
      </div>
    </div>
  );
}

export default EditResume;
