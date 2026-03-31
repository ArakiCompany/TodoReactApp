'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default function AnnualChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'line',
      data: {
        labels: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
        datasets: [{
          label: 'Lucro',
          data: [38, 42, 41, 44, 47, 52, 49, 55, 58, 61, 57, 62],
          borderColor: '#6366f1',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: true,
          backgroundColor: 'rgba(99,102,241,0.08)',
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: '#52525b', font: { size: 9, family: 'DM Mono' }, maxTicksLimit: 6 },
            grid: { display: false },
            border: { display: false },
          },
          y: {
            ticks: { color: '#52525b', font: { size: 9, family: 'DM Mono' }, callback: v => `R$${v}k` },
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
        Resumo anual
      </p>
      <div className="relative h-36">
        <canvas ref={ref} />
      </div>
    </div>
  );
}