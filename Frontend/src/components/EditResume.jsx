import React, { useEffect, useState } from "react";
import { PDFDocument, StandardFonts, rgb, PDFArray, PDFName } from "pdf-lib";
import { Document, Page, pdfjs } from "react-pdf";
import Section from "../Editor/Section";
import { useRef } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

function EditResume() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const [name, setName] = useState("chhagan Rakhade");
  const [skills, setSkills] = useState(" ");
  const [tolls, setTools] = useState("  ");
  const [location, setLocation] = useState("Nagpur, Maharashtra");
  const [phone, setPhone] = useState("9158396794");
  const [email, setEmail] = useState("chhaganrakhade7@gmail.com");
  const [github, setGithub] = useState("https://github.com/username");
  const [linkedin, setLinkedin] = useState("https://linkedin.com/in/username");
  const [portfolio, setPortfolio] = useState("https://myportfolio.com");
  const [summary, setSummaray] = useState("hi iam full stack deveoper ");
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfBytes, setPdfBytes] = useState(null);

  // Safe icon loader that supports PNG/JPG
  const loadIcon = async (pdfDoc, path) => {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Icon not found: ${path}`);
    const bytes = await res.arrayBuffer();

    // Check format from extension and file header bytes
    const ext = path.split(".").pop().toLowerCase();
    const header = new Uint8Array(bytes).slice(0, 8); // Get initial bytes
    const isPng =
      ext === "png" &&
      header[0] === 0x89 &&
      header[1] === 0x50 &&
      header[2] === 0x4e &&
      header[3] === 0x47 &&
      header[4] === 0x0d &&
      header[5] === 0x0a &&
      header[6] === 0x1a &&
      header[7] === 0x0a;
    const isJpg =
      (ext === "jpg" || ext === "jpeg") &&
      header[0] === 0xff &&
      header[1] === 0xd8;

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

      /// function for line proper making
      function wrapText(text, maxWidth, font, fontSize) {
        const words = text.split(" ");
        let lines = [];
        let currentLine = "";

        for (let word of words) {
          const width = font.widthOfTextAtSize(currentLine + word, fontSize);
          if (width < maxWidth) {
            currentLine += word + " ";
          } else {
            lines.push(currentLine.trim());
            currentLine = word + " ";
          }
        }
        if (currentLine) lines.push(currentLine.trim());
        return lines;
      }
      // prevent line
      const handleChange = (e) => {
        const value = e.target.value;
        const lines = value.split("\n");

        // Prevent typing if more than 3 lines
        if (lines.length <= 3) {
          setSummaray(value);
        }
      };

      const lines = wrapText(summary, 400, normalFont, 8); // 500px is max width
      let y = pageHeight - 115; // starting position

      // Summaray Heading
      firstPage.drawText("Summary", {
        x: 35,
        y: pageHeight - 100, // adjust this based on actual spacing
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      firstPage.drawLine({
        start: { x: 35, y: pageHeight - 105 }, // start point
        end: { x: pageWidth - 35, y: pageHeight - 105 }, // end point
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      // summaray
      lines.forEach((line) => {
        firstPage.drawText(line, {
          x: 35,
          y: y,
          size: 10,
          font: normalFont,
          color: rgb(0, 0, 0),
        });
        y -= 14; // space between lines
      });

      // Technical Skills
      firstPage.drawText("Skills", {
        x: 35,
        y: pageHeight - 155, // adjust this based on actual spacing
        size: 10,
        font: boldFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawText("Technical :", {
        x: 35,
        y: pageHeight - 173, // adjust this based on actual spacing
        size: 10,
        // font: ,
        color: rgb(0, 0, 0),
      });

      firstPage.drawLine({
        start: { x: 35, y: pageHeight - 160 }, // start point
        end: { x: pageWidth - 35, y: pageHeight - 160 }, // end point
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText(skills, {
        x: 85,
        y: pageHeight - 173,
        size: 10,
        font: normalFont,
        color: rgb(0, 0, 0),
      });

     


      // extra skills 
      firstPage.drawText("Tools :", {
        x: 35,
        y: pageHeight - 188, // adjust this based on actual spacing
        size: 10,
        // font: ,
        color: rgb(0, 0, 0),
      });
      firstPage.drawText(tolls, {
        x: 85,
        y: pageHeight - 188,
        size: 10,
        font: normalFont,
        color: rgb(0, 0, 0),
      });

      firstPage.drawLine({
        start: { x: 35, y: pageHeight - 192 }, // start point
        end: { x: pageWidth - 35, y: pageHeight - 192 }, // end point
        thickness: 1,
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
        {
          label: email,
          icon: emailIcon,
          url: email ? `mailto:${email}` : null,
        },
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

      let currentX = pageWidth / 2 - totalWidth / 2;
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

      // technical skills

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

  // handleempty fieled

  return (
    <div className="flex bg-gray-50">
      {/* Left form */}
      <div className="w-1/3 p-6 h-auto border-r border-gray-300 bg-gray-50 flex flex-col space-y-6">
        {/* Personal Info Section */}
        <Section
          title="Personal Information"
          onUpdate={generatePdf}
          onDownload={downloadPdf}
          showDownload={!!pdfBytes}
        >
          <label className="text-sm font-medium text-gray-600">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">
            GitHub URL
          </label>
          <input
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">
            LinkedIn URL
          </label>
          <input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">
            Portfolio URL
          </label>
          <input
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <label className="text-sm font-medium text-gray-600">
            Profile Summary
          </label>
          <input
            value={summary}
            onChange={(e) => setSummaray(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </Section>

        {/* Technical Skills Section */}
        {/* <Section
        title="Technical Skills"
        onUpdate={generatePdf}
        onDownload={downloadPdf}
        showDownload={!!pdfBytes}
      >
        {skills.map((skill, index) => (
          <input
            key={index}
            value={skill}
            onChange={(e) => updateSkill(index, e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
            placeholder={`Skill ${index + 1}`}
          />
        ))}
        <button
          onClick={() => setSkills([...skills, ""])}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded-lg"
        >
          + Add Skill
        </button>
      </Section> */}

        {/* Random Example Section */}
        <Section
          title="Tecknical Skills"
          onUpdate={generatePdf}
          onDownload={downloadPdf}
          showDownload={!!pdfBytes}
        >
          <label className="text-sm font-medium text-gray-600">
            Technical Skills
          </label>
          <input
            placeholder="Technical Skilaa"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
          <label className="text-sm font-medium text-gray-600">
            Extra Skills
          </label>
          <input
            placeholder="Tools & network"
            value={tolls}
            onChange={(e) => setTools(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </Section>

       
      </div>

      {/* PDF preview */}
      <div className="w-2/3 h-screen p-6 overflow-auto">
        {pdfUrl ? (
          <div className="border rounded-lg shadow bg-white p-4 flex justify-center">
            <Document file={pdfUrl}>
              <Page
                pageNumber={1}
                renderTextLayer={false}
                renderAnnotationLayer={true}
              />
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
