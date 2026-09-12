import { WorkoutPlan } from '../../types/workout.types';

interface Props {
  plan: WorkoutPlan;
  onEdit: (plan: WorkoutPlan) => void;
  onDelete: (id: string) => void;
}

export default function PlanCard({ plan, onEdit, onDelete }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 hover:border-zinc-700 transition group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{plan.emoji}</span>
          <div>
            <h3 className="text-sm font-medium text-zinc-100">{plan.name}</h3>
            <p className="text-xs text-zinc-600 font-mono">{plan.exercises.length} exercícios</p>
          </div>
        </div>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={() => onEdit(plan)}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-zinc-200 transition"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button
            onClick={() => onDelete(plan.id)}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-zinc-800 hover:bg-red-950/40 text-zinc-400 hover:text-red-400 transition"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {plan.exercises.map((ex, i) => (
          <span key={ex.id} className="text-xs bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full font-mono">
            {i + 1}. {ex.name}
          </span>
        ))}
      </div>
    </div>
  );
}