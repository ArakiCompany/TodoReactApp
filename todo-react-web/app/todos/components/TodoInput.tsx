'use client';

import { useState } from 'react';

interface Props {
  onAdd: (title: string) => void;
  loading?: boolean;
}

export default function TodoInput({ onAdd, loading }: Props) {
  const [value, setValue] = useState('');

  function handleSubmit() {
    if (!value.trim()) return;
    onAdd(value.trim());
    setValue('');
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
        placeholder="Adicionar nova tarefa..."
        className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
      />
      <button
        onClick={handleSubmit}
        disabled={loading || !value.trim()}
        className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 rounded-xl flex items-center justify-center transition hover:scale-105 active:scale-95"
      >
        {loading ? (
          <svg className="animate-spin w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
        ) : (
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
        )}
      </button>
    </div>
  );
}