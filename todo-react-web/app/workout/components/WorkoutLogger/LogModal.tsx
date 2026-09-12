import { LogForm } from '../../hooks/useWorkoutLogger';
import { WorkoutSet } from '../../types/workout.types';
import ExerciseLogger from './ExerciseLogger';
import Modal from '../shared/Modal';

interface Props {
  open: boolean;
  form: LogForm | null;
  saving: boolean;
  onClose: () => void;
  onUpdate: (updates: Partial<LogForm>) => void;
  onAddSet: (exIdx: number) => void;
  onUpdateSet: (exIdx: number, setIdx: number, field: keyof WorkoutSet, value: number) => void;
  onRemoveSet: (exIdx: number, setIdx: number) => void;
  onSave: () => void;
}

export default function LogModal({
  open, form, saving, onClose, onUpdate,
  onAddSet, onUpdateSet, onRemoveSet, onSave,
}: Props) {
  if (!form) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      maxWidth="max-w-lg"
      title={form.planName}
      footer={
        <>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-transparent border border-zinc-800 rounded-xl text-sm text-zinc-500 hover:text-zinc-300 transition"
          >
            Cancelar
          </button>
          <button
            onClick={onSave}
            disabled={saving}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 rounded-xl text-sm text-white font-medium transition flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Salvando...
              </>
            ) : 'Salvar treino'}
          </button>
        </>
      }
    >
      <div className="p-5 space-y-5">
        <input
          type="date"
          value={form.date}
          onChange={e => onUpdate({ date: e.target.value })}
          className="text-xs text-zinc-500 bg-transparent outline-none"
        />

        {form.exercises.map((ex, exIdx) => (
          <ExerciseLogger
            key={ex.exerciseId}
            exercise={ex}
            exIdx={exIdx}
            onAddSet={onAddSet}
            onUpdateSet={onUpdateSet}
            onRemoveSet={onRemoveSet}
          />
        ))}

        <div>
          <label className="block text-xs font-medium text-zinc-500 mb-1">Observação</label>
          <input
            value={form.notes}
            onChange={e => onUpdate({ notes: e.target.value })}
            placeholder="Como foi o treino?"
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>
    </Modal>
  );
}