'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface Props {
  salary: number;
  totalFixed: number;
  totalVariable: number;
  totalExpenses: number;
  balance: number;
}

export default function RevenueChart({ salary, totalFixed, totalVariable, totalExpenses, balance }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: ['Salário', 'Gastos Fixos', 'Gastos Variáveis', 'Total Gastos', 'Saldo Livre'],
        datasets: [
          {
            data: [salary, totalFixed, totalVariable, totalExpenses, balance > 0 ? balance : 0],
            backgroundColor: [
              '#4ade80',
              '#6366f1',
              '#fbbf24',
              '#f87171',
              '#818cf8',
            ],
            borderRadius: 6,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `R$${Number(ctx.raw).toLocaleString('pt-BR')}`,
            },
          },
        },
        scales: {
          x: {
            ticks: { color: '#52525b', font: { size: 10, family: 'DM Mono' } },
            grid: { display: false },
            border: { display: false },
          },
          y: {
            ticks: {
              color: '#52525b',
              font: { size: 10, family: 'DM Mono' },
              callback: v => `R$${Number(v).toLocaleString('pt-BR')}`,
            },
            grid: { color: '#1c1c1f' },
            border: { display: false },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [salary, totalFixed, totalVariable, totalExpenses, balance]);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">
        Visão geral financeira
      </p>
      <div className="relative h-44">
        <canvas ref={ref} />
      </div>
      <div className="flex flex-wrap gap-3 mt-3">
        {[
          { label: 'Salário', color: '#4ade80' },
          { label: 'Fixos', color: '#6366f1' },
          { label: 'Variáveis', color: '#fbbf24' },
          { label: 'Total gastos', color: '#f87171' },
          { label: 'Saldo', color: '#818cf8' },
        ].map(l => (
          <span key={l.label} className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
            <span className="w-2 h-2 rounded-sm inline-block" style={{ background: l.color }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}