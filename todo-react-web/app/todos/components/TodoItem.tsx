'use client';

interface Props {
  id: string;
  title: string;
  isCompleted: boolean;
  index: number;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ id, title, isCompleted, index, onComplete, onDelete }: Props) {
  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/80 animate-fadeIn ${
        isCompleted ? 'opacity-50' : ''
      }`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Checkbox */}
      <button
        onClick={() => !isCompleted && onComplete(id)}
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
          isCompleted
            ? 'bg-indigo-600 border-indigo-600'
            : 'border-zinc-700 hover:border-indigo-500'
        }`}
      >
        {isCompleted && (
          <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M5 13l4 4L19 7"/>
          </svg>
        )}
      </button>

      {/* Texto */}
      <span className={`flex-1 text-sm transition-all duration-200 ${
        isCompleted ? 'line-through text-zinc-600' : 'text-zinc-300'
      }`}>
        {title}
      </span>

      {/* Index */}
      <span className="text-xs font-mono text-zinc-700 group-hover:text-zinc-600 transition">
        #{String(index + 1).padStart(2, '0')}
      </span>

      {/* Delete */}
      <button
        onClick={() => onDelete(id)}
        className="w-6 h-6 rounded-md flex items-center justify-center text-zinc-700 opacity-0 group-hover:opacity-100 hover:bg-red-950/30 hover:text-red-400 transition-all duration-150"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}