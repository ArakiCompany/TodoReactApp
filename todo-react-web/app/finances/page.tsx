'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BusinessRoute from '@/app/components/BusinessRoute';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import CategoryChart from './components/CategoryChart';
import GoalsCard from './components/GoalsCard';
import AnnualChart from './components/AnnualChart';
import RecentTransactions from './components/RecentTransactions';

const periods = ['7d', '30d', '90d', '1a'];

const metrics = [
  { label: 'Receita', value: 'R$84,2k', change: '12.4% vs mês anterior', positive: true },
  { label: 'Despesas', value: 'R$31,7k', change: '3.1% vs mês anterior', positive: false },
  { label: 'Lucro líquido', value: 'R$52,5k', change: '18.9% vs mês anterior', positive: true },
  { label: 'Margem', value: '62.3%', change: '4.2pp vs mês anterior', positive: true },
];

export default function AdminPage() {
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState('30d');

  return (
    <BusinessRoute>
      <div className="min-h-screen bg-zinc-950 p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h1 className="text-base font-medium text-zinc-100">Financeiro</h1>
              <span className="text-xs font-mono bg-indigo-950/40 text-indigo-400 border border-indigo-900/40 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Period tabs */}
              <div className="hidden sm:flex gap-0.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                {periods.map(p => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-md transition ${
                      activePeriod === p
                        ? 'bg-zinc-700 text-zinc-100'
                        : 'text-zinc-600 hover:text-zinc-400'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <button
                onClick={() => router.push('/todos')}
                className="text-xs text-zinc-600 border border-zinc-800 rounded-lg px-3 py-1.5 hover:text-zinc-400 hover:border-zinc-700 transition"
              >
                ← voltar
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
            {metrics.map(m => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            <RecentTransactions />
          </div>

          {/* Bottom row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <CategoryChart />
            <GoalsCard />
            <AnnualChart />
          </div>

        </div>
      </div>
    </BusinessRoute>
  );
}