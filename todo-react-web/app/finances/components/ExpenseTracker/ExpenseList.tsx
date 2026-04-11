import { Expense } from '../../types/finance.types';
import ExpenseItem from './ExpenseItem';

interface Props {
  title: string;
  type: 'fixed' | 'variable';
  items: Expense[];
  total: number;
  dotColor: string;
  badgeStyle: string;
  onAdd: (type: 'fixed' | 'variable') => void;
  onRemove: (type: 'fixed' | 'variable', id: string) => void;
  onUpdate: (type: 'fixed' | 'variable', id: string, field: 'name' | 'value', val: string) => void;
}

export default function ExpenseList({
  title, type, items, total, dotColor, badgeStyle,
  onAdd, onRemove, onUpdate,
}: Props) {
  return (
    <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-4">

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{title}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${badgeStyle}`}>
          R${total.toLocaleString('pt-BR')}
        </span>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-2.5 mb-3">
        {items.map(item => (
          <ExpenseItem
            key={item.id}
            id={item.id}
            name={item.name}
            value={item.value}
            dotColor={dotColor}
            onUpdate={(id, field, val) => onUpdate(type, id, field, val)}
            onRemove={(id) => onRemove(type, id)}
          />
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={() => onAdd(type)}
        className="flex items-center gap-1.5 text-xs text-zinc-700 hover:text-zinc-400 border border-dashed border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2 transition w-full justify-center"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        adicionar
      </button>
    </div>
  );
}