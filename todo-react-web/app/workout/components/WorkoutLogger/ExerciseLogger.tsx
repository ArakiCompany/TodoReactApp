import { LogFormExercise } from '../../hooks/useWorkoutLogger';
import { WorkoutSet } from '../../types/workout.types';
import SetRow from './SetRow';

interface Props {
  exercise: LogFormExercise;
  exIdx: number;
  onAddSet: (exIdx: number) => void;
  onUpdateSet: (exIdx: number, setIdx: number, field: keyof WorkoutSet, value: number) => void;
  onRemoveSet: (exIdx: number, setIdx: number) => void;
}

export default function ExerciseLogger({ exercise, exIdx, onAddSet, onUpdateSet, onRemoveSet }: Props) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-zinc-300">{exercise.exerciseName}</p>

      <div className="grid grid-cols-4 gap-2 text-xs font-mono text-zinc-600 px-1">
        <span>Série</span>
        <span>Peso (kg)</span>
        <span>Reps</span>
        <span />
      </div>

      {exercise.sets.map((set, setIdx) => (
        <SetRow
          key={setIdx}
          set={set}
          onUpdate={(field, value) => onUpdateSet(exIdx, setIdx, field, value)}
          onRemove={() => onRemoveSet(exIdx, setIdx)}
        />
      ))}

      <button
        onClick={() => onAddSet(exIdx)}
        className="text-xs text-zinc-600 hover:text-zinc-400 transition flex items-center gap-1.5 pl-1"
      >
        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14"/>
        </svg>
        adicionar série
      </button>

      <div className="border-b border-zinc-800" />
    </div>
  );
}