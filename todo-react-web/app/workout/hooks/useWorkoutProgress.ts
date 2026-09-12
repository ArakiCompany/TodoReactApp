import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { WorkoutPlan, ExerciseProgress } from '../types/workout.types';
import { GET_WORKOUT_PLANS, GET_EXERCISE_PROGRESS } from '../graphql/workout.queries';

export type ChartType = 'weight' | 'volume' | 'reps';
export type ChartStyle = 'area' | 'line' | 'bar';

export const CHART_COLORS = [
  '#6366f1', '#4ade80', '#f59e0b', '#f87171',
  '#818cf8', '#34d399', '#fb923c', '#a78bfa',
];

export function useWorkoutProgress() {
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedExercises, setSelectedExercises] = useState<Set<string>>(new Set());
  const [chartType, setChartType] = useState<ChartType>('weight');
  const [chartStyle, setChartStyle] = useState<ChartStyle>('area');

  const { data: plansData } = useQuery<{ workoutPlans: WorkoutPlan[] }>(GET_WORKOUT_PLANS);

  const { data: progressData, loading } = useQuery<{ exerciseProgress: ExerciseProgress[] }>(
    GET_EXERCISE_PROGRESS,
    {
      variables: { planId: selectedPlan },
      skip: !selectedPlan,
      fetchPolicy: 'network-only',
    }
  );

  const progress = progressData?.exerciseProgress ?? [];

  function handlePlanChange(planId: string) {
    setSelectedPlan(planId);
    const plan = plansData?.workoutPlans.find(p => p.id === planId);
    if (plan) setSelectedExercises(new Set(plan.exercises.map(e => e.name)));
  }

  function toggleExercise(name: string) {
    setSelectedExercises(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const filteredProgress = progress.filter(p => selectedExercises.has(p.exerciseName));

  const chartData = [...new Set(
    filteredProgress.flatMap(p => p.points.map(pt => pt.date))
  )].sort().map(date => {
    const entry: Record<string, string | number> = {
      date,
      label: new Date(date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }),
    };
    filteredProgress.forEach(ex => {
      const point = ex.points.find(p => p.date === date);
      if (point) {
        entry[ex.exerciseName] =
          chartType === 'weight' ? point.maxWeight
          : chartType === 'volume' ? Math.round(point.totalVolume)
          : point.totalReps;
      }
    });
    return entry;
  });

  const stats = filteredProgress.map((ex, i) => {
    const { points } = ex;
    if (!points.length) return null;
    const latest = points.at(-1)!;
    const first = points[0];
    const maxEver = Math.max(...points.map(p => p.maxWeight));
    const improvement = first.maxWeight > 0
      ? ((latest.maxWeight - first.maxWeight) / first.maxWeight * 100).toFixed(1)
      : '0';
    return { name: ex.exerciseName, latest, maxEver, improvement, total: points.length, color: CHART_COLORS[i % CHART_COLORS.length] };
  }).filter(Boolean);

  return {
    plans: plansData?.workoutPlans ?? [],
    selectedPlan,
    selectedExercises,
    chartType,
    chartStyle,
    progress,
    filteredProgress,
    chartData,
    stats,
    loading,
    handlePlanChange,
    toggleExercise,
    setChartType,
    setChartStyle,
  };
}