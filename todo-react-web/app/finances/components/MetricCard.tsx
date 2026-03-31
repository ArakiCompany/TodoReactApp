interface Props {
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

export default function MetricCard({ label, value, change, positive }: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <p className="text-xs text-zinc-600 font-mono uppercase tracking-wider mb-2">
        {label}
      </p>
      <p className="text-2xl font-medium text-zinc-100 tracking-tight">{value}</p>
      <p className={`text-xs font-mono mt-1.5 ${positive ? 'text-green-400' : 'text-red-400'}`}>
        {positive ? '↑' : '↓'} {change}
      </p>
    </div>
  );
}