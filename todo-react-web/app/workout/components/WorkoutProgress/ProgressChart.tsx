'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar,
} from 'recharts';
import { ChartStyle, CHART_COLORS } from '../../hooks/useWorkoutProgress';
import { ExerciseProgress } from '../../types/workout.types';
import CustomTooltip from './CustomTooltip';

interface Props {
  chartData: Record<string, string | number>[];
  filteredProgress: ExerciseProgress[];
  chartStyle: ChartStyle;
  label: string;
}

export default function ProgressChart({ chartData, filteredProgress, chartStyle, label }: Props) {
  const ChartComponent = chartStyle === 'bar' ? BarChart : chartStyle === 'area' ? AreaChart : LineChart;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-4">{label}</p>
      <ResponsiveContainer width="100%" height={260}>
        <ChartComponent data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="label"
            tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#52525b', fontSize: 10, fontFamily: 'DM Mono' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'DM Mono', color: '#71717a' }} />
          {filteredProgress.map((ex, i) => {
            const color = CHART_COLORS[i % CHART_COLORS.length];
            if (chartStyle === 'area') return (
              <Area key={ex.exerciseName} type="monotone" dataKey={ex.exerciseName}
                stroke={color} fill={`${color}20`} strokeWidth={2}
                dot={{ fill: color, r: 3 }} activeDot={{ r: 5 }} />
            );
            if (chartStyle === 'bar') return (
              <Bar key={ex.exerciseName} dataKey={ex.exerciseName} fill={color} radius={[4,4,0,0]} />
            );
            return (
              <Line key={ex.exerciseName} type="monotone" dataKey={ex.exerciseName}
                stroke={color} strokeWidth={2} dot={{ fill: color, r: 3 }} activeDot={{ r: 5 }} />
            );
          })}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}