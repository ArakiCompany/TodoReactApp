'use client';

import { useState } from 'react';

interface Expense {
  id: string;
  name: string;
  value: number;
}

interface FinanceData {
  salary: number;
  fixed: Expense[];
  variable: Expense[];
}

interface Props {
  onUpdate: (data: FinanceData) => void;
}

const STORAGE_KEY = 'finance_data';

function loadData(): FinanceData {
  if (typeof window === 'undefined') return { salary: 0, fixed: [], variable: [] };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { salary: 0, fixed: [], variable: [] };
  } catch {
    return { salary: 0, fixed: [], variable: [] };
  }
}

function saveData(data: FinanceData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function ExpenseList({
  title,
  badge,
  type,
  items,
  dotColor,
  badgeStyle,
  onAdd,
  onRemove,
  onUpdate,
}: {
  title: string;
  badge: string;
  type: 'fixed' | 'variable';
  items: Expense[];
  dotColor: string;
  badgeStyle: string;
  onAdd: (type: 'fixed' | 'variable') => void;
  onRemove: (type: 'fixed' | 'variable', id: string) => void;
  onUpdate: (type: 'fixed' | 'variable', id: string, field: 'name' | 'value', val: string) => void;
}) {
  const total = items.reduce((s, i) => s + i.value, 0);

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{title}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${badgeStyle}`}>
          R${total.toLocaleString('pt-BR')}
        </span>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-2 group">
            <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
            <input
              value={item.name}
              onChange={e => onUpdate(type, item.id, 'name', e.target.value)}
              className="flex-1 bg-transparent text-xs text-zinc-400 outline-none placeholder-zinc-700 border-b border-transparent focus:border-zinc-700 transition pb-0.5"
              placeholder="nome"
            />
            <span className="text-xs text-zinc-700 font-mono">R$</span>
            <input
              type="number"
              value={item.value || ''}
              onChange={e => onUpdate(type, item.id, 'value', e.target.value)}
              className="w-20 bg-transparent text-xs text-zinc-400 font-mono outline-none text-right border-b border-transparent focus:border-zinc-700 transition pb-0.5"
              placeholder="0"
            />
            <button
              onClick={() => onRemove(type, item.id)}
              className="opacity-0 group-hover:opacity-100 text-zinc-700 hover:text-red-400 transition-all"
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onAdd(type)}
        className="flex items-center gap-1.5 text-xs text-zinc-700 hover:text-zinc-400 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-1.5 transition w-full justify-center"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        adicionar
      </button>
    </div>
  );
}

export default function ExpenseTracker({ onUpdate }: Props) {
  const [data, setData] = useState<FinanceData>(loadData);
  const [salaryInput, setSalaryInput] = useState(data.salary.toString());
  const [saved, setSaved] = useState(false);

  const totalFixed = data.fixed.reduce((s, i) => s + i.value, 0);
  const totalVariable = data.variable.reduce((s, i) => s + i.value, 0);
  const totalExpenses = totalFixed + totalVariable;
  const balance = data.salary - totalExpenses;

  function addExpense(type: 'fixed' | 'variable') {
    const newItem = { id: crypto.randomUUID(), name: '', value: 0 };
    setData(prev => ({ ...prev, [type]: [...prev[type], newItem] }));
  }

  function removeExpense(type: 'fixed' | 'variable', id: string) {
    setData(prev => ({ ...prev, [type]: prev[type].filter(i => i.id !== id) }));
  }

  function updateExpense(type: 'fixed' | 'variable', id: string, field: 'name' | 'value', val: string) {
    setData(prev => ({
      ...prev,
      [type]: prev[type].map(i =>
        i.id === id ? { ...i, [field]: field === 'value' ? parseFloat(val) || 0 : val } : i
      ),
    }));
  }

  function handleUpdate() {
    const updated = { ...data, salary: parseFloat(salaryInput) || 0 };
    setData(updated);
    saveData(updated);
    onUpdate(updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Meus gastos</p>
        <span className="text-xs font-mono text-zinc-700">localStorage</span>
      </div>

      {/* Salário */}
      <div className="flex items-center gap-4 p-3.5 bg-zinc-950 rounded-xl border border-zinc-800">
        <div className="w-9 h-9 bg-green-950/30 border border-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-xs font-mono text-zinc-600 mb-0.5">salário mensal</p>
          <div className="flex items-baseline gap-1">
            <span className="text-sm text-green-500 font-mono">R$</span>
            <input
              type="number"
              value={salaryInput}
              onChange={e => setSalaryInput(e.target.value)}
              className="flex-1 bg-transparent text-xl font-medium text-green-400 font-mono outline-none"
              placeholder="0"
            />
          </div>
        </div>
      </div>

      {/* Listas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ExpenseList
          title="Gastos fixos"
          badge={`R$${totalFixed.toLocaleString('pt-BR')}`}
          type="fixed"
          items={data.fixed}
          dotColor="bg-indigo-500"
          badgeStyle="bg-indigo-950/30 text-indigo-400 border-indigo-900/30"
          onAdd={addExpense}
          onRemove={removeExpense}
          onUpdate={updateExpense}
        />
        <ExpenseList
          title="Gastos variáveis"
          badge={`R$${totalVariable.toLocaleString('pt-BR')}`}
          type="variable"
          items={data.variable}
          dotColor="bg-amber-400"
          badgeStyle="bg-amber-950/30 text-amber-400 border-amber-900/30"
          onAdd={addExpense}
          onRemove={removeExpense}
          onUpdate={updateExpense}
        />
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800">
          <p className="text-xs font-mono text-zinc-600 mb-1">salário</p>
          <p className="text-base font-medium font-mono text-green-400">
            R${(parseFloat(salaryInput) || 0).toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800">
          <p className="text-xs font-mono text-zinc-600 mb-1">gastos</p>
          <p className="text-base font-medium font-mono text-red-400">
            R${totalExpenses.toLocaleString('pt-BR')}
          </p>
        </div>
        <div className="bg-zinc-950 rounded-xl p-3 border border-zinc-800">
          <p className="text-xs font-mono text-zinc-600 mb-1">saldo livre</p>
          <p className={`text-base font-medium font-mono ${balance >= 0 ? 'text-indigo-400' : 'text-red-400'}`}>
            R${balance.toLocaleString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Botão */}
      <button
        onClick={handleUpdate}
        className="w-full py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 active:scale-[0.98] bg-indigo-600 hover:bg-indigo-500 text-white"
      >
        {saved ? (
          <>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7"/>
            </svg>
            Dashboard atualizado!
          </>
        ) : (
          <>
            Atualizar dashboard
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </>
        )}
      </button>
    </div>
  );
}