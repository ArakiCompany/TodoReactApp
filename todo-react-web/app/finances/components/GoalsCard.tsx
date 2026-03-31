const goals = [
  { label: 'Receita', value: 84, color: 'bg-indigo-500' },
  { label: 'Novos clientes', value: 61, color: 'bg-green-400' },
  { label: 'Churn rate', value: 92, color: 'bg-amber-400' },
  { label: 'NPS', value: 78, color: 'bg-indigo-400' },
];

export default function GoalsCard() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-4">
        Metas do mês
      </p>
      <div className="flex flex-col gap-3">
        {goals.map(g => (
          <div key={g.label}>
            <div className="flex justify-between mb-1.5">
              <span className="text-xs text-zinc-400">{g.label}</span>
              <span className="text-xs text-zinc-600 font-mono">{g.value}%</span>
            </div>
            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${g.color} transition-all duration-700`}
                style={{ width: `${g.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}