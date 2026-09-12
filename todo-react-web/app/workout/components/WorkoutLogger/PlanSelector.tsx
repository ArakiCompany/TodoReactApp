import { WorkoutPlan } from '../../types/workout.types';

interface Props {
  plans: WorkoutPlan[];
  onSelect: (plan: WorkoutPlan) => void;
}

export default function PlanSelector({ plans, onSelect }: Props) {
  return (
    <div>
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
        Registrar treino de hoje
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {plans.map(plan => (
          <button
            key={plan.id}
            onClick={() => onSelect(plan)}
            className="flex flex-col items-center gap-2 p-4 bg-zinc-900 border border-zinc-800 hover:border-indigo-900/50 hover:bg-indigo-950/10 rounded-2xl transition group"
          >
            <span className="text-2xl group-hover:scale-110 transition">{plan.emoji}</span>
            <span className="text-xs text-zinc-400 font-medium">{plan.name}</span>
            <span className="text-xs text-zinc-700 font-mono">{plan.exercises.length} ex.</span>
          </button>
        ))}
      </div>
    </div>
  );
}