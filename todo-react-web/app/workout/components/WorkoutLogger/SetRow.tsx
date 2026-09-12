import { WorkoutSet } from '../../types/workout.types';

interface Props {
  set: WorkoutSet;
  onUpdate: (field: keyof WorkoutSet, value: number) => void;
  onRemove: () => void;
}

export default function SetRow({ set, onUpdate, onRemove }: Props) {
  return (
    <div className="grid grid-cols-4 gap-2 items-center">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-500">
        {set.setNumber}
      </div>
      <input
        type="number"
        value={set.weight || ''}
        onChange={e => onUpdate('weight', parseFloat(e.target.value) || 0)}
        placeholder="0"
        className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-2 text-sm text-zinc-200 text-center font-mono focus:outline-none focus:border-indigo-500 transition"
      />
      <input
        type="number"
        value={set.reps || ''}
        onChange={e => onUpdate('reps', parseInt(e.target.value) || 0)}
        placeholder="0"
        className="bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-2 text-sm text-zinc-200 text-center font-mono focus:outline-none focus:border-indigo-500 transition"
      />
      <button
        onClick={onRemove}
        className="w-8 h-8 flex items-center justify-center text-zinc-700 hover:text-red-400 transition mx-auto"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>
  );
}