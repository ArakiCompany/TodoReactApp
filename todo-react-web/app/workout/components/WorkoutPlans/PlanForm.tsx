import { PlanFormData } from '../../hooks/useWorkoutPlans';
import EmojiPicker from './EmojiPicker';

interface Props {
  data: PlanFormData;
  saving: boolean;
  onUpdate: (updates: Partial<PlanFormData>) => void;
  onAddExercise: () => void;
  onUpdateExercise: (id: string, name: string) => void;
  onRemoveExercise: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function PlanForm({
  data, saving, onUpdate, onAddExercise,
  onUpdateExercise, onRemoveExercise, onSave, onCancel,
}: Props) {
  return (
    <>
      <div className="p-5 space-y-4">
        <EmojiPicker value={data.emoji} onChange={emoji => onUpdate({ emoji })} />

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-1">Nome do treino</label>
          <input
            value={data.name}
            onChange={e => onUpdate({ name: e.target.value })}
            placeholder="ex: Perna, Peito, Costas..."
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-400 mb-2">
            Exercícios ({data.exercises.length})
          </label>
          <div className="space-y-2">
            {data.exercises.map((ex, i) => (
              <div key={ex.id} className="flex items-center gap-2 group">
                <span className="text-xs font-mono text-zinc-700 w-5">{i + 1}.</span>
                <input
                  value={ex.name}
                  onChange={e => onUpdateExercise(ex.id, e.target.value)}
                  placeholder="Nome do exercício"
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition"
                />
                <button
                  onClick={() => onRemoveExercise(ex.id)}
                  className="text-zinc-700 hover:text-red-400 transition opacity-0 group-hover:opacity-100"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={onAddExercise}
            className="mt-2 text-xs text-zinc-600 hover:text-zinc-400 transition flex items-center gap-1.5"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14"/>
            </svg>
            adicionar exercício
          </button>
        </div>
      </div>

      <div className="flex gap-2 p-4 border-t border-zinc-800">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 bg-transparent border border-zinc-800 hover:border-zinc-700 rounded-xl text-sm text-zinc-500 hover:text-zinc-300 transition"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          disabled={saving || !data.name.trim()}
          className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-xl text-sm text-white font-medium transition"
        >
          {saving ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </>
  );
}