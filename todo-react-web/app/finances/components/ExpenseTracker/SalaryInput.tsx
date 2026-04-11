interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function SalaryInput({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-4 p-4 bg-zinc-950 rounded-xl border border-zinc-800">
      <div className="w-10 h-10 bg-green-950/30 border border-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      </div>
      <div className="flex-1">
        <p className="text-xs font-mono text-zinc-600 mb-1">salário mensal</p>
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-green-500 font-mono">R$</span>
          <input
            type="number"
            value={value || ''}
            onChange={e => onChange(parseFloat(e.target.value) || 0)}
            className="flex-1 bg-transparent text-2xl font-medium text-green-400 font-mono outline-none"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
}