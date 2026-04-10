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
import ExpenseTracker from './components/ExpenseTracker';

const periods = ['7d', '30d', '90d', '1a'];

interface FinanceData {
  salary: number;
  fixed: { id: string; name: string; value: number }[];
  variable: { id: string; name: string; value: number }[];
}

function formatCurrency(value: number) {
  if (value >= 1000) return `R$${(value / 1000).toFixed(1)}k`;
  return `R$${value.toLocaleString('pt-BR')}`;
}

export default function FinancesPage() {
  const router = useRouter();
  const [activePeriod, setActivePeriod] = useState('30d');
  const [financeData, setFinanceData] = useState<FinanceData | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem('finance_data');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const totalFixed = financeData?.fixed.reduce((s, i) => s + i.value, 0) ?? 0;
  const totalVariable = financeData?.variable.reduce((s, i) => s + i.value, 0) ?? 0;
  const totalExpenses = totalFixed + totalVariable;
  const salary = financeData?.salary ?? 0;
  const netProfit = salary - totalExpenses;
  const margin = salary > 0 ? ((netProfit / salary) * 100).toFixed(1) : '0';

  const metrics = [
    {
      label: 'Salário',
      value: formatCurrency(salary),
      change: 'entrada mensal',
      positive: true,
    },
    {
      label: 'Despesas',
      value: formatCurrency(totalExpenses),
      change: `fixos: ${formatCurrency(totalFixed)} | variáveis: ${formatCurrency(totalVariable)}`,
      positive: false,
    },
    {
      label: 'Saldo livre',
      value: formatCurrency(netProfit),
      change: netProfit >= 0 ? 'no positivo' : 'no negativo',
      positive: netProfit >= 0,
    },
    {
      label: 'Margem',
      value: `${margin}%`,
      change: 'do salário restante',
      positive: parseFloat(margin) >= 20,
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
              <button onClick={() => router.push('/todos')} className="text-xs text-zinc-600 border border-zinc-800 rounded-lg px-3 py-1.5 hover:text-zinc-400 hover:border-zinc-700 transition">
                ← voltar
              </button>
            </div>
          </div>

          {/* Metrics — dinâmicas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
            {metrics.map(m => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          {/* Charts + Expenses */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-3">
            <div className="lg:col-span-2 flex flex-col gap-3">
              <RevenueChart />
              {/* Expense Tracker */}
              <ExpenseTracker onUpdate={setFinanceData} />
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