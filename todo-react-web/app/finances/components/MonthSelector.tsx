'use client';

interface Props {
  month: number;
  year: number;
  onChange: (month: number, year: number) => void;
}

const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function MonthSelector({ month, year, onChange }: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - 2 + i);

  function prev() {
    if (month === 1) onChange(12, year - 1);
    else onChange(month - 1, year);
  }

  function next() {
    const now = new Date();
    if (year === now.getFullYear() && month === now.getMonth() + 1) return;
    if (month === 12) onChange(1, year + 1);
    else onChange(month + 1, year);
  }

  const isCurrentMonth = month === new Date().getMonth() + 1 && year === new Date().getFullYear();

  return (
    <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
      <button
        onClick={prev}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>

      <div className="flex items-center gap-1.5 px-1">
        <select
          value={month}
          onChange={e => onChange(parseInt(e.target.value), year)}
          className="bg-transparent text-xs font-mono text-zinc-300 outline-none cursor-pointer"
        >
          {MONTHS.map((m, i) => (
            <option key={i + 1} value={i + 1} className="bg-zinc-900">{m}</option>
          ))}
        </select>
        <select
          value={year}
          onChange={e => onChange(month, parseInt(e.target.value))}
          className="bg-transparent text-xs font-mono text-zinc-300 outline-none cursor-pointer"
        >
          {years.map(y => (
            <option key={y} value={y} className="bg-zinc-900">{y}</option>
          ))}
        </select>
      </div>

      <button
        onClick={next}
        disabled={isCurrentMonth}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}