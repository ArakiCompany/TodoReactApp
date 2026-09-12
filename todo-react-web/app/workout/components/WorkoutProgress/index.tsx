'use client';

import { useWorkoutProgress } from '../../hooks/useWorkoutProgress';
import EmptyState from '../shared/EmptyState';
import ChartControls from './ChartControls';
import ExerciseFilter from './ExerciseFilter';
import ProgressChart from './ProgressChart';
import StatCard from './StatCard';

const CHART_LABELS = {
  weight: 'Evolução de peso máximo (kg)',
  volume: 'Volume total (kg × reps)',
  reps: 'Total de repetições',
};

export default function WorkoutProgress() {
  const {
    plans, selectedPlan, selectedExercises,
    chartType, chartStyle,
    progress, filteredProgress, chartData, stats,
    loading,
    handlePlanChange, toggleExercise,
    setChartType, setChartStyle,
  } = useWorkoutProgress();

  return (
    <div className="space-y-5">

      {/* Seletor de treino */}
      <div>
        <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">Treino</p>
        <div className="flex flex-wrap gap-2">
          {plans.map(plan => (
            <button
              key={plan.id}
              onClick={() => handlePlanChange(plan.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm border transition ${
                selectedPlan === plan.id
                  ? 'bg-indigo-600 border-indigo-500 text-white'
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
              }`}
            >
              <span>{plan.emoji}</span>
              {plan.name}
            </button>
          ))}
        </div>
      </div>

      {selectedPlan && (
        <>
          {progress.length > 0 && (
            <ExerciseFilter
              progress={progress}
              selected={selectedExercises}
              onToggle={toggleExercise}
            />
          )}

          <ChartControls
            chartType={chartType}
            chartStyle={chartStyle}
            onTypeChange={setChartType}
            onStyleChange={setChartStyle}
          />

          {loading ? (
            <div className="h-64 bg-zinc-900 rounded-2xl animate-pulse" />
          ) : chartData.length > 0 ? (
            <ProgressChart
              chartData={chartData}
              filteredProgress={filteredProgress}
              chartStyle={chartStyle}
              label={CHART_LABELS[chartType]}
            />
          ) : (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl">
              <EmptyState emoji="📈" title="Nenhum dado ainda" subtitle="Registre treinos para ver a evolução" />
            </div>
          )}

          {stats.length > 0 && (
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Resumo por exercício
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {stats.map(stat => stat && (
                  <StatCard
                    key={stat.name}
                    name={stat.name}
                    latestWeight={stat.latest.maxWeight}
                    maxEver={stat.maxEver}
                    improvement={stat.improvement}
                    total={stat.total}
                    color={stat.color}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}