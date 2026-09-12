import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { WorkoutPlan, WorkoutLog, WorkoutSet } from '../types/workout.types';
import {
  GET_WORKOUT_PLANS, GET_WORKOUT_LOGS,
  SAVE_WORKOUT_LOG, DELETE_WORKOUT_LOG,
} from '../graphql/workout.queries';

export interface LogFormExercise {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
}

export interface LogForm {
  planId: string;
  planName: string;
  date: string;
  notes: string;
  exercises: LogFormExercise[];
}

export function useWorkoutLogger() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<LogForm | null>(null);

  const { data: plansData } = useQuery<{ workoutPlans: WorkoutPlan[] }>(GET_WORKOUT_PLANS);

  const { data: logsData, loading, refetch } = useQuery<{ workoutLogs: WorkoutLog[] }>(
    GET_WORKOUT_LOGS,
    {
      variables: { from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() },
      fetchPolicy: 'network-only',
    }
  );

  const [saveLog, { loading: saving }] = useMutation(SAVE_WORKOUT_LOG);
  const [deleteLog] = useMutation(DELETE_WORKOUT_LOG);

  function startLog(plan: WorkoutPlan) {
    setForm({
      planId: plan.id,
      planName: plan.name,
      date: new Date().toISOString().slice(0, 10),
      notes: '',
      exercises: plan.exercises.map(ex => ({
        exerciseId: ex.id,
        exerciseName: ex.name,
        sets: [{ setNumber: 1, weight: 0, reps: 0 }],
      })),
    });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setForm(null);
  }

  function updateForm(updates: Partial<LogForm>) {
    setForm(prev => prev ? { ...prev, ...updates } : null);
  }

  function addSet(exIdx: number) {
    if (!form) return;
    const exercises = [...form.exercises];
    const prev = exercises[exIdx].sets.at(-1);
    exercises[exIdx].sets.push({
      setNumber: exercises[exIdx].sets.length + 1,
      weight: prev?.weight ?? 0,
      reps: prev?.reps ?? 0,
    });
    updateForm({ exercises });
  }

  function updateSet(exIdx: number, setIdx: number, field: keyof WorkoutSet, value: number) {
    if (!form) return;
    const exercises = [...form.exercises];
    exercises[exIdx].sets[setIdx] = { ...exercises[exIdx].sets[setIdx], [field]: value };
    updateForm({ exercises });
  }

  function removeSet(exIdx: number, setIdx: number) {
    if (!form) return;
    const exercises = [...form.exercises];
    exercises[exIdx].sets = exercises[exIdx].sets
      .filter((_, i) => i !== setIdx)
      .map((s, i) => ({ ...s, setNumber: i + 1 }));
    updateForm({ exercises });
  }

  async function handleSave() {
    if (!form) return;
    await saveLog({
      variables: {
        input: {
          workoutPlanId: form.planId,
          workoutPlanName: form.planName,
          date: new Date(form.date).toISOString(),
          notes: form.notes,
          exercises: form.exercises.map(ex => ({
            exerciseId: ex.exerciseId,
            exerciseName: ex.exerciseName,
            sets: ex.sets.map(({ setNumber, weight, reps }) => ({ setNumber, weight, reps })),
          })),
        }
      }
    });
    await refetch();
    closeForm();
  }

  async function handleDeleteLog(id: string) {
    await deleteLog({ variables: { id } });
    await refetch();
  }

  return {
    plans: plansData?.workoutPlans ?? [],
    logs: logsData?.workoutLogs ?? [],
    loading,
    saving,
    showForm,
    form,
    startLog,
    closeForm,
    updateForm,
    addSet,
    updateSet,
    removeSet,
    handleSave,
    handleDeleteLog,
  };
}