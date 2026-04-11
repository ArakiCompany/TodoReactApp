'use client';

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { Expense, FinanceData, FinanceDto, GetFinanceResponse, SaveFinanceResponse } from '../../types/finance.types';
import SalaryInput from './SalaryInput';
import ExpenseList from './ExpenseList';
import FinanceSummary from './FinanceSummary';
import SaveButton from './SaveButton';

const GET_FINANCE = gql`
  query GetFinance {
    finance {
      id salary totalFixed totalVariable totalExpenses balance marginPercent updatedAt
      fixed { id name value }
      variable { id name value }
    }
  }
`;

const SAVE_FINANCE = gql`
  mutation SaveFinance($input: SaveFinanceInput!) {
    saveFinance(input: $input) {
      id salary totalFixed totalVariable totalExpenses balance marginPercent updatedAt
      fixed { id name value }
      variable { id name value }
    }
  }
`;

interface Props {
  onUpdate: (data: FinanceDto) => void;
}

export default function ExpenseTracker({ onUpdate }: Props) {
  const [data, setData] = useState<FinanceData>({ salary: 0, fixed: [], variable: [] });
  const [saved, setSaved] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  const { data: queryData, loading } = useQuery<GetFinanceResponse>(GET_FINANCE, {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const finance = queryData?.finance;
    if (!finance) return;
    setTimeout(() => {
      setData({ salary: finance.salary, fixed: finance.fixed, variable: finance.variable });
      setLastUpdated(finance.updatedAt);
      onUpdate(finance);
    }, 0);
  }, [queryData]);

  const [saveFinance, { loading: saving }] = useMutation<SaveFinanceResponse>(SAVE_FINANCE);

  const totalFixed = data.fixed.reduce((s, i) => s + i.value, 0);
  const totalVariable = data.variable.reduce((s, i) => s + i.value, 0);
  const totalExpenses = totalFixed + totalVariable;
  const balance = data.salary - totalExpenses;

  function addExpense(type: 'fixed' | 'variable') {
    const newItem: Expense = { id: crypto.randomUUID(), name: '', value: 0 };
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

  async function handleSave() {
    const result = await saveFinance({
      variables: {
        input: {
          salary: data.salary,
          fixed: data.fixed.map(({ id, name, value }) => ({ id, name, value })),
          variable: data.variable.map(({ id, name, value }) => ({ id, name, value })),
        }
      }
    });

    const finance = result.data?.saveFinance;
    if (finance) {
      onUpdate(finance);
      setLastUpdated(finance.updatedAt);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
  }

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 animate-pulse space-y-3">
        <div className="h-4 w-24 bg-zinc-800 rounded" />
        <div className="h-16 bg-zinc-800 rounded-xl" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-32 bg-zinc-800 rounded-xl" />
          <div className="h-32 bg-zinc-800 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Meus gastos</p>
        {lastUpdated && (
          <span className="text-xs text-zinc-700 font-mono">
            atualizado {new Date(lastUpdated).toLocaleDateString('pt-BR')}
          </span>
        )}
      </div>

      <SalaryInput
        value={data.salary}
        onChange={val => setData(prev => ({ ...prev, salary: val }))}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ExpenseList
          title="Fixos" type="fixed" items={data.fixed} total={totalFixed}
          dotColor="bg-indigo-500"
          badgeStyle="bg-indigo-950/30 text-indigo-400 border-indigo-900/30"
          onAdd={addExpense} onRemove={removeExpense} onUpdate={updateExpense}
        />
        <ExpenseList
          title="Variáveis" type="variable" items={data.variable} total={totalVariable}
          dotColor="bg-amber-400"
          badgeStyle="bg-amber-950/30 text-amber-400 border-amber-900/30"
          onAdd={addExpense} onRemove={removeExpense} onUpdate={updateExpense}
        />
      </div>

      <FinanceSummary
        salary={data.salary}
        totalExpenses={totalExpenses}
        balance={balance}
      />

      <SaveButton saving={saving} saved={saved} onClick={handleSave} />
    </div>
  );
}