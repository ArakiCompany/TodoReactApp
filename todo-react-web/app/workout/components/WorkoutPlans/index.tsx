'use client';

import { useWorkoutPlans } from '../../hooks/useWorkoutPlans';
import PlanCard from './PlanCard';
import PlanForm from './PlanForm';
import Modal from '../shared/Modal';
import EmptyState from '../shared/EmptyState';

export default function WorkoutPlans() {
  const {
    plans, loading, saving, editing, showForm,
    openNew, openEdit, closeForm, updateEditing,
    addExercise, updateExercise, removeExercise,
    handleSave, handleDelete,
  } = useWorkoutPlans();

  if (loading) return (
    <div className="space-y-3 animate-pulse">
      {[1,2,3].map(i => <div key={i} className="h-24 bg-zinc-900 rounded-2xl" />)}
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
          {plans.length} treinos cadastrados
        </p>
        <button
          onClick={openNew}
          className="flex items-center gap-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl px-3 py-2 transition"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Novo treino
        </button>
      </div>

      <div className="space-y-2">
        {plans.length === 0 ? (
          <EmptyState emoji="🏋️" title="Nenhum treino cadastrado" subtitle='Clique em "Novo treino" para começar' />
        ) : (
          plans.map(plan => (
            <PlanCard key={plan.id} plan={plan} onEdit={openEdit} onDelete={handleDelete} />
          ))
        )}
      </div>

      <Modal
        open={showForm && !!editing}
        onClose={closeForm}
        title={editing?.id ? 'Editar treino' : 'Novo treino'}
      >
        {editing && (
          <PlanForm
            data={editing}
            saving={saving}
            onUpdate={updateEditing}
            onAddExercise={addExercise}
            onUpdateExercise={updateExercise}
            onRemoveExercise={removeExercise}
            onSave={handleSave}
            onCancel={closeForm}
          />
        )}
      </Modal>
    </div>
  );
}