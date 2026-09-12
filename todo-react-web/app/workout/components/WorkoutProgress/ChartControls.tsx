import { ChartType, ChartStyle } from '../../hooks/useWorkoutProgress';

interface Props {
  chartType: ChartType;
  chartStyle: ChartStyle;
  onTypeChange: (t: ChartType) => void;
  onStyleChange: (s: ChartStyle) => void;
}

export default function ChartControls({ chartType, chartStyle, onTypeChange, onStyleChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
        {(['weight', 'volume', 'reps'] as ChartType[]).map(type => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              chartType === type ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {type === 'weight' ? '⚖️ Peso' : type === 'volume' ? '📊 Volume' : '🔄 Reps'}
          </button>
        ))}
      </div>
      <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
        {(['area', 'line', 'bar'] as ChartStyle[]).map(style => (
          <button
            key={style}
            onClick={() => onStyleChange(style)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
              chartStyle === style ? 'bg-zinc-700 text-zinc-100' : 'text-zinc-600 hover:text-zinc-400'
            }`}
          >
            {style === 'area' ? '〰 Area' : style === 'line' ? '— Line' : '▐ Bar'}
          </button>
        ))}
      </div>
    </div>
  );
}