import { WorkoutLog } from '../../types/workout.types';

interface Props {
  log: WorkoutLog;
  onDelete: (id: string) => void;
}

export default function LogHistoryItem({ log, onDelete }: Props) {
  const maxWeight = Math.max(...log.exercises.map(e => e.maxWeight));
  const totalVolume = log.exercises.reduce((s, e) => s + e.totalVolume, 0);

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl group hover:border-zinc-700 transition">
      <div className="flex-1 min-w-0">
        <p className="text-sm text-zinc-300 font-medium">{log.workoutPlanName}</p>
        <p className="text-xs text-zinc-600 font-mono">
          {new Date(log.date).toLocaleDateString('pt-BR')} · {log.exercises.length} exercícios
        </p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-mono text-indigo-400">{maxWeight}kg max</p>
          <p className="text-xs font-mono text-zinc-600">{totalVolume.toLocaleString()} vol</p>
        </div>
        <button
          onClick={() => onDelete(log.id)}
          className="text-zinc-700 hover:text-red-400 transition opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
      </div>
    </div>
  );
}