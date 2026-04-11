'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BusinessRoute from '@/app/components/BusinessRoute';
import MetricCard from './components/MetricCard';
import RevenueChart from './components/RevenueChart';
import CategoryChart from './components/CategoryChart';
import RecentTransactions from './components/RecentTransactions';
import PdfGenerator from './components/PdfGenerator';
import ExpenseTracker from './components/ExpenseTracker';

const periods = ['7d', '30d', '90d', '1a'];

interface FinanceState {
  salary: number;
  fixed: { id: string; name: string; value: number }[];
  variable: { id: string; name: string; value: number }[];
  totalFixed: number;
  totalVariable: number;
  totalExpenses: number;
  balance: number;
  marginPercent: number;
}

function formatCurrency(value: number) {
  if (value >= 1000) return `R$${(value / 1000).toFixed(1)}k`;
  return `R$${value.toLocaleString('pt-BR')}`;
}

export default function FinancesPage() {
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState('30d');
  const [finance, setFinance] = useState<FinanceState | null>(null);

  const metrics = [
    {
      label: 'Salário',
      value: formatCurrency(finance?.salary ?? 0),
      change: 'entrada mensal',
      positive: true,
    },
    {
      label: 'Despesas',
      value: formatCurrency(finance?.totalExpenses ?? 0),
      change: finance ? `fixos ${formatCurrency(finance.totalFixed)} | var. ${formatCurrency(finance.totalVariable)}` : 'sem dados',
      positive: false,
    },
    {
      label: 'Saldo livre',
      value: formatCurrency(finance?.balance ?? 0),
      change: (finance?.balance ?? 0) >= 0 ? 'no positivo' : 'no negativo',
      positive: (finance?.balance ?? 0) >= 0,
    },
    {
      label: 'Margem',
      value: `${finance?.marginPercent ?? 0}%`,
      change: 'do salário restante',
      positive: (finance?.marginPercent ?? 0) >= 20,
    },
  ];

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
                Business
              </span>
            </div>
            <div className="flex items-center gap-2">
              {finance && (
                <PdfGenerator
                  salary={finance.salary}
                  fixed={finance.fixed}
                  variable={finance.variable}
                  totalFixed={finance.totalFixed}
                  totalVariable={finance.totalVariable}
                  totalExpenses={finance.totalExpenses}
                  balance={finance.balance}
                  marginPercent={finance.marginPercent}
                />
              )}
              <div className="hidden sm:flex gap-0.5 bg-zinc-900 border border-zinc-800 rounded-lg p-1">
                {periods.map(p => (
                  <button
                    key={p}
                    onClick={() => setActivePeriod(p)}
                    className={`text-xs font-mono px-2.5 py-1 rounded-md transition ${
                      activePeriod === p ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'
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
            {metrics.map(m => <MetricCard key={m.label} {...m} />)}
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <RevenueChart
                salary={finance?.salary ?? 0}
                totalFixed={finance?.totalFixed ?? 0}
                totalVariable={finance?.totalVariable ?? 0}
                totalExpenses={finance?.totalExpenses ?? 0}
                balance={finance?.balance ?? 0}
              />
              <ExpenseTracker onUpdate={setFinance} />
            </div>
            <div className="flex flex-col gap-3">
              <RecentTransactions />
              <CategoryChart />
            </div>
          </div>

        </div>
      </div>
    </BusinessRoute>
  );
}