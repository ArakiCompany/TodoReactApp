'use client';

import { useState } from 'react';
import { Expense } from '../types/finance.types';

interface Props {
  salary: number;
  fixed: Expense[];
  variable: Expense[];
  totalFixed: number;
  totalVariable: number;
  totalExpenses: number;
  balance: number;
  marginPercent: number;
}

export default function PdfButton({
  salary, fixed, variable,
  totalFixed, totalVariable, totalExpenses, balance, marginPercent
}: Props) {
  const [generating, setGenerating] = useState(false);

  async function handleGenerate() {
    setGenerating(true);
    try {
      const jsPDF = (await import('jspdf')).default;
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = doc.internal.pageSize.getWidth();
      const today = new Date().toLocaleDateString('pt-BR', {
        day: '2-digit', month: 'long', year: 'numeric'
      });

      doc.setFillColor(9, 9, 11);
      doc.rect(0, 0, pageW, 297, 'F');

      doc.setFillColor(99, 102, 241);
      doc.roundedRect(14, 14, pageW - 28, 28, 3, 3, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('Relatório Financeiro', 22, 26);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(199, 210, 254);
      doc.text(today, 22, 33);

      const metrics = [
        { label: 'Salário', value: `R$${salary.toLocaleString('pt-BR')}`, color: [74, 222, 128] as [number, number, number] },
        { label: 'Total Gastos', value: `R$${totalExpenses.toLocaleString('pt-BR')}`, color: [248, 113, 113] as [number, number, number] },
        { label: 'Saldo Livre', value: `R$${balance.toLocaleString('pt-BR')}`, color: [129, 140, 248] as [number, number, number] },
        { label: 'Margem', value: `${marginPercent}%`, color: [251, 191, 36] as [number, number, number] },
      ];

      const cardW = (pageW - 28 - 9) / 4;
      metrics.forEach((m, i) => {
        const x = 14 + i * (cardW + 3);
        doc.setFillColor(24, 24, 27);
        doc.roundedRect(x, 50, cardW, 22, 2, 2, 'F');
        doc.setFontSize(7);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(113, 113, 122);
        doc.text(m.label, x + 4, 58);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(...m.color);
        doc.text(m.value, x + 4, 66);
      });

      let y = 82;

      function drawSection(title: string, items: Expense[], total: number, accent: [number, number, number]) {
        const sectionH = 14 + Math.max(items.length, 1) * 7 + 10;
        doc.setFillColor(24, 24, 27);
        doc.roundedRect(14, y, pageW - 28, sectionH, 2, 2, 'F');
        doc.setFillColor(...accent);
        doc.roundedRect(14, y, pageW - 28, 10, 2, 2, 'F');
        doc.rect(14, y + 5, pageW - 28, 5, 'F');
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(255, 255, 255);
        doc.text(title, 20, y + 6.5);
        doc.text(`R$${total.toLocaleString('pt-BR')}`, pageW - 14, y + 6.5, { align: 'right' });

        items.forEach((item, i) => {
          const iy = y + 16 + i * 7;
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(161, 161, 170);
          doc.text(item.name || '-', 22, iy);
          doc.setTextColor(113, 113, 122);
          doc.text(`R$${item.value.toLocaleString('pt-BR')}`, pageW - 18, iy, { align: 'right' });
          if (i < items.length - 1) {
            doc.setDrawColor(39, 39, 42);
            doc.setLineWidth(0.2);
            doc.line(22, iy + 2, pageW - 18, iy + 2);
          }
        });
        y += sectionH + 6;
      }

      drawSection('Gastos Fixos', fixed, totalFixed, [99, 102, 241]);
      drawSection('Gastos Variáveis', variable, totalVariable, [217, 119, 6]);

      doc.setFillColor(24, 24, 27);
      doc.roundedRect(14, y, pageW - 28, 28, 2, 2, 'F');
      doc.setDrawColor(39, 39, 42);
      doc.setLineWidth(0.3);
      doc.line(18, y + 10, pageW - 18, y + 10);
      doc.line(18, y + 18, pageW - 18, y + 18);

      const resumo = [
        { label: 'Salário', value: `R$${salary.toLocaleString('pt-BR')}`, color: [74, 222, 128] as [number, number, number] },
        { label: 'Total Gastos', value: `R$${totalExpenses.toLocaleString('pt-BR')}`, color: [248, 113, 113] as [number, number, number] },
        { label: 'Saldo Livre', value: `R$${balance.toLocaleString('pt-BR')}`, color: balance >= 0 ? [129, 140, 248] as [number, number, number] : [248, 113, 113] as [number, number, number] },
      ];

      resumo.forEach((r, i) => {
        const ry = y + 8 + i * 8;
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(113, 113, 122);
        doc.text(r.label, 22, ry);
        doc.setTextColor(...r.color);
        doc.text(r.value, pageW - 18, ry, { align: 'right' });
      });

      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(63, 63, 70);
      doc.text('TodoApp — Relatório gerado automaticamente', pageW / 2, 285, { align: 'center' });
      doc.save(`relatorio-financeiro-${new Date().toISOString().slice(0, 10)}.pdf`);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <button
      onClick={handleGenerate}
      disabled={generating || !salary}
      className="flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-zinc-100 border border-zinc-800 hover:border-zinc-600 rounded-lg px-3 py-2 transition disabled:opacity-40 disabled:cursor-not-allowed bg-zinc-900 hover:bg-zinc-800"
    >
      {generating ? (
        <>
          <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Gerando PDF...
        </>
      ) : (
        <>
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
          </svg>
          Exportar PDF
        </>
      )}
    </button>
  );
}