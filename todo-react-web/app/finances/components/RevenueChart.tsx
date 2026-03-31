'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function RevenueChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [
          {
            label: 'Receita',
            data: [62, 71, 68, 75, 79, 84],
            backgroundColor: '#6366f1',
            borderRadius: 4,
            borderSkipped: false,
          },
          {
            label: 'Despesas',
            data: [28, 31, 27, 33, 30, 32],
            backgroundColor: '#27272a',
            borderRadius: 4,
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
            callbacks: { label: ctx => `R$${ctx.raw}k` },
          },
        },
        scales: {
          x: {
            ticks: { color: '#52525b', font: { size: 10, family: 'DM Mono' } },
            grid: { display: false },
            border: { display: false },
          },
          y: {
            ticks: { color: '#52525b', font: { size: 10, family: 'DM Mono' }, callback: v => `R$${v}k` },
            grid: { color: '#1c1c1f' },
            border: { display: false },
          },
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-4">
        Receita vs Despesas
      </p>
      <div className="relative h-40">
        <canvas ref={ref} />
      </div>
      <div className="flex gap-4 mt-3">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
          <span className="w-2 h-2 rounded-sm bg-indigo-500 inline-block" />
          Receita
        </span>
        <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
          <span className="w-2 h-2 rounded-sm bg-zinc-800 inline-block" />
          Despesas
        </span>
      </div>
    </div>
  );
}