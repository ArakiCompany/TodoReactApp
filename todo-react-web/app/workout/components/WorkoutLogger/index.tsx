'use client';

import { useWorkoutLogger } from '../../hooks/useWorkoutLogger';
import PlanSelector from './PlanSelector';
import LogHistory from './LogHistory';
import LogModal from './LogModal';

export default function WorkoutLogger() {
  const {
    plans, logs, loading, saving,
    showForm, form,
    startLog, closeForm, updateForm,
    addSet, updateSet, removeSet,
    handleSave, handleDeleteLog,
  } = useWorkoutLogger();

  return (
    <div className="space-y-6">
      <PlanSelector plans={plans} onSelect={startLog} />
      <LogHistory logs={logs} loading={loading} onDelete={handleDeleteLog} />
      <LogModal
        open={showForm}
        form={form}
        saving={saving}
        onClose={closeForm}
        onUpdate={updateForm}
        onAddSet={addSet}
        onUpdateSet={updateSet}
        onRemoveSet={removeSet}
        onSave={handleSave}
      />
    </div>
  );
}