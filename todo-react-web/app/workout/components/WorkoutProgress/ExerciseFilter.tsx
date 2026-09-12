import { ExerciseProgress } from '../../types/workout.types';
import { CHART_COLORS } from '../../hooks/useWorkoutProgress';

interface Props {
  progress: ExerciseProgress[];
  selected: Set<string>;
  onToggle: (name: string) => void;
}

export default function ExerciseFilter({ progress, selected, onToggle }: Props) {
  return (
    <div>
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Exercícios</p>
      <div className="flex flex-wrap gap-1.5">
        {progress.map((ex, i) => (
          <button
            key={ex.exerciseName}
            onClick={() => onToggle(ex.exerciseName)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition"
            style={{
              background: selected.has(ex.exerciseName) ? `${CHART_COLORS[i % CHART_COLORS.length]}20` : 'transparent',
              borderColor: selected.has(ex.exerciseName) ? CHART_COLORS[i % CHART_COLORS.length] : '#27272a',
              color: selected.has(ex.exerciseName) ? CHART_COLORS[i % CHART_COLORS.length] : '#52525b',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
            {ex.exerciseName}
          </button>
        ))}
      </div>
    </div>
  );
}