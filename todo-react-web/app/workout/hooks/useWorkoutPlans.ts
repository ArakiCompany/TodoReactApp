import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client/react';
import { WorkoutPlan, WorkoutExercise } from '../types/workout.types';
import { GET_WORKOUT_PLANS, SAVE_WORKOUT_PLAN, DELETE_WORKOUT_PLAN } from '../graphql/workout.queries';

export interface PlanFormData {
  id?: string;
  name: string;
  emoji: string;
  exercises: WorkoutExercise[];
}

export function useWorkoutPlans() {
  const [editing, setEditing] = useState<PlanFormData | null>(null);
  const [showForm, setShowForm] = useState(false);

  const { data, loading, refetch } = useQuery<{ workoutPlans: WorkoutPlan[] }>(
    GET_WORKOUT_PLANS,
    { fetchPolicy: 'network-only' }
  );

  const [savePlan, { loading: saving }] = useMutation(SAVE_WORKOUT_PLAN);
  const [deletePlan] = useMutation(DELETE_WORKOUT_PLAN);

  function openNew() {
    setEditing({ name: '', emoji: '🔥', exercises: [] });
    setShowForm(true);
  }

  function openEdit(plan: WorkoutPlan) {
    setEditing({ id: plan.id, name: plan.name, emoji: plan.emoji, exercises: [...plan.exercises] });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditing(null);
  }

  function updateEditing(updates: Partial<PlanFormData>) {
    setEditing(prev => prev ? { ...prev, ...updates } : null);
  }

  function addExercise() {
    if (!editing) return;
    const newEx: WorkoutExercise = {
      id: crypto.randomUUID(),
      name: '',
      order: editing.exercises.length,
    };
    updateEditing({ exercises: [...editing.exercises, newEx] });
  }

  function updateExercise(id: string, name: string) {
    if (!editing) return;
    updateEditing({
      exercises: editing.exercises.map(e => e.id === id ? { ...e, name } : e),
    });
  }

  function removeExercise(id: string) {
    if (!editing) return;
    updateEditing({
      exercises: editing.exercises
        .filter(e => e.id !== id)
        .map((e, i) => ({ ...e, order: i })),
    });
  }

  async function handleSave() {
    if (!editing?.name.trim()) return;
    await savePlan({
      variables: {
        input: {
          id: editing.id ?? null,
          name: editing.name,
          emoji: editing.emoji,
          exercises: editing.exercises.map(({ id, name, order }) => ({ id, name, order })),
        }
      }
    });
    await refetch();
    closeForm();
  }

  async function handleDelete(id: string) {
    await deletePlan({ variables: { id } });
    await refetch();
  }

  return {
    plans: data?.workoutPlans ?? [],
    loading,
    saving,
    editing,
    showForm,
    openNew,
    openEdit,
    closeForm,
    updateEditing,
    addExercise,
    updateExercise,
    removeExercise,
    handleSave,
    handleDelete,
  };
}