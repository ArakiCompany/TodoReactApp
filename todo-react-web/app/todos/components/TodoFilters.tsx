'use client';

export type Filter = 'all' | 'pending' | 'done';

interface Props {
  active: Filter;
  onChange: (filter: Filter) => void;
}

const filters: { label: string; value: Filter }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Concluídas', value: 'done' },
];

export default function TodoFilters({ active, onChange }: Props) {
  return (
    <div className="flex gap-1.5 mb-4">
      {filters.map(f => (
        <button
          key={f.value}
          onClick={() => onChange(f.value)}
          className={`text-xs px-3 py-1 rounded-md border transition ${
            active === f.value
              ? 'bg-zinc-900 border-zinc-700 text-zinc-100'
              : 'bg-transparent border-transparent text-zinc-600 hover:text-zinc-400'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}