interface Props {
  salary: number;
  totalExpenses: number;
  balance: number;
}

export default function FinanceSummary({ salary, totalExpenses, balance }: Props) {
  const items = [
    { label: 'salário', value: salary, color: 'text-green-400' },
    { label: 'gastos', value: totalExpenses, color: 'text-red-400' },
    { label: 'saldo livre', value: balance, color: balance >= 0 ? 'text-indigo-400' : 'text-red-400' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(item => (
        <div key={item.label} className="bg-zinc-950 rounded-xl p-3 border border-zinc-800">
          <p className="text-xs font-mono text-zinc-600 mb-1">{item.label}</p>
          <p className={`text-base font-medium font-mono ${item.color}`}>
            R${item.value.toLocaleString('pt-BR')}
          </p>
        </div>
      ))}
    </div>
  );
}