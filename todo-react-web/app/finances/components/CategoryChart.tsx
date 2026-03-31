'use client';

import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const categories = [
  { label: 'Assinaturas', value: '48%', color: '#6366f1' },
  { label: 'Serviços', value: '32%', color: '#4ade80' },
  { label: 'Outros', value: '20%', color: '#fbbf24' },
];

export default function CategoryChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    chartRef.current?.destroy();

    chartRef.current = new Chart(ref.current, {
      type: 'doughnut',
      data: {
        labels: categories.map(c => c.label),
        datasets: [{
          data: [48, 32, 20],
          backgroundColor: categories.map(c => c.color),
          borderWidth: 0,
          hoverOffset: 4,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: { legend: { display: false } },
      },
    });

    return () => chartRef.current?.destroy();
  }, []);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-4">
        Por categoria
      </p>
      <div className="relative h-28 mb-3">
        <canvas ref={ref} />
      </div>
      <div className="flex flex-col gap-1.5">
        {categories.map(c => (
          <div key={c.label} className="flex justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-sm inline-block" style={{ background: c.color }} />
              {c.label}
            </span>
            <span className="text-zinc-600 font-mono">{c.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}