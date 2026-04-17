'use client';

import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Chart, registerables } from 'chart.js';
import { GetFinanceSummariesResponse } from '../types/finance.types';

Chart.register(...registerables);

const GET_SUMMARIES = gql`
  query GetFinanceSummaries {
    financeSummaries {
      month year monthLabel salary totalExpenses balance
    }
  }
`;

export default function RevenueChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  const { data, loading } = useQuery<GetFinanceSummariesResponse>(GET_SUMMARIES, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (!ref.current || !data?.financeSummaries) return;
    chartRef.current?.destroy();

    const summaries = data.financeSummaries;

    if (summaries.length === 0) return;

    chartRef.current = new Chart(ref.current, {
      type: 'bar',
      data: {
        labels: summaries.map(s => s.monthLabel),
        datasets: [
          {
            label: 'Salário',
            data: summaries.map(s => s.salary),
            backgroundColor: '#4ade80',
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: 'Gastos',
            data: summaries.map(s => s.totalExpenses),
            backgroundColor: '#f87171',
            borderRadius: 5,
            borderSkipped: false,
          },
          {
            label: 'Saldo',
            data: summaries.map(s => s.balance),
            backgroundColor: '#818cf8',
            type: 'line' as const,
            borderColor: '#818cf8',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#818cf8',
            tension: 0.4,
            fill: false,
            yAxisID: 'y',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.dataset.label}: R$${Number(ctx.raw).toLocaleString('pt-BR')}`,
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
  }, [data]);

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse">
        <div className="h-4 w-32 bg-zinc-800 rounded mb-4" />
        <div className="h-44 bg-zinc-800 rounded-xl" />
      </div>
    );
  }

  if (!data?.financeSummaries.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-col items-center justify-center h-48 gap-3">
        <div className="w-10 h-10 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center">
          <svg className="w-4 h-4 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3v18h18"/>
            <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
          </svg>
        </div>
        <p className="text-xs text-zinc-700 font-mono">nenhum dado salvo ainda</p>
        <p className="text-xs text-zinc-800 font-mono">salve seu primeiro mês abaixo</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          Histórico mensal
        </p>
        <span className="text-xs font-mono text-zinc-700">
          {data.financeSummaries.length} {data.financeSummaries.length === 1 ? 'mês' : 'meses'}
        </span>
      </div>
      <div className="relative h-44">
        <canvas ref={ref} />
      </div>
      <div className="flex gap-4 mt-3">
        {[
          { label: 'Salário', color: '#4ade80' },
          { label: 'Gastos', color: '#f87171' },
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