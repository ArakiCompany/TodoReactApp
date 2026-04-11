interface Props {
  id: string;
  name: string;
  value: number;
  dotColor: string;
  onUpdate: (id: string, field: 'name' | 'value', val: string) => void;
  onRemove: (id: string) => void;
}

export default function ExpenseItem({ id, name, value, dotColor, onUpdate, onRemove }: Props) {
  return (
    <div className="flex items-center gap-2 group">
      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />

      <input
        value={name}
        onChange={e => onUpdate(id, 'name', e.target.value)}
        className="flex-1 min-w-0 bg-transparent text-xs text-zinc-300 outline-none placeholder-zinc-700 border-b border-transparent focus:border-zinc-700 transition pb-0.5"
        placeholder="nome do gasto"
      />

      <div className="flex items-center gap-1 flex-shrink-0">
        <span className="text-xs text-zinc-700 font-mono">R$</span>
        <input
          type="number"
          value={value || ''}
          onChange={e => onUpdate(id, 'value', e.target.value)}
          className="w-16 bg-transparent text-xs text-zinc-400 font-mono outline-none text-right border-b border-transparent focus:border-zinc-700 transition pb-0.5"
          placeholder="0"
        />
      </div>

      <button
        onClick={() => onRemove(id)}
        className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-lg bg-zinc-800 hover:bg-red-950/40 text-zinc-600 hover:text-red-400 transition-all border border-zinc-700 hover:border-red-900/50 sm:w-6 sm:h-6 sm:bg-transparent sm:border-0 sm:opacity-0 sm:group-hover:opacity-100"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}