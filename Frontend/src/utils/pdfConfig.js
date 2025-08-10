import { pdfjs } from 'react-pdf';

// Configure PDF.js worker source
// Using local worker to avoid CORS issues with CDN workers
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

// Optional: Set additional PDF.js options
pdfjs.GlobalWorkerOptions.isEvalSupported = false;

export default pdfjs;