import dynamic from 'next/dynamic';

// ← ssr: false garante que o jsPDF nunca roda no servidor
const PdfGenerator = dynamic(() => import('./PdfButton'), { ssr: false });

export default PdfGenerator;