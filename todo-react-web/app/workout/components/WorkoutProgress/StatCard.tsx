interface Props {
  name: string;
  latestWeight: number;
  maxEver: number;
  improvement: string;
  total: number;
  color: string;
}

export default function StatCard({ name, latestWeight, maxEver, improvement, total, color }: Props) {
  const improved = parseFloat(improvement) > 0;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-zinc-300">{name}</p>
        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${
          improved
            ? 'bg-green-950/30 text-green-400 border-green-900/30'
            : 'bg-zinc-800 text-zinc-500 border-zinc-700'
        }`}>
          {improved ? '+' : ''}{improvement}%
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'atual', value: `${latestWeight}kg`, color: 'text-zinc-200' },
          { label: 'máx', value: `${maxEver}kg`, color: undefined },
          { label: 'logs', value: String(total), color: 'text-zinc-200' },
        ].map((item, i) => (
          <div key={i} className="bg-zinc-950 rounded-xl p-2.5 text-center">
            <p className="text-xs text-zinc-600 font-mono mb-1">{item.label}</p>
            <p
              className={`text-sm font-bold font-mono ${item.color ?? ''}`}
              style={!item.color ? { color } : undefined}
            >
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}