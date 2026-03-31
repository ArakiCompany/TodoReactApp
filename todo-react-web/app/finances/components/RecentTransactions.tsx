const transactions = [
  { name: 'AWS Cloud', category: 'Infraestrutura', amount: '-R$1.240', positive: false, icon: '☁' },
  { name: 'Venda Pro Plan', category: 'Assinatura', amount: '+R$4.800', positive: true, icon: '★' },
  { name: 'Licença Figma', category: 'Design', amount: '-R$320', positive: false, icon: '◈' },
  { name: 'Consultoria B2B', category: 'Serviços', amount: '+R$12.000', positive: true, icon: '◆' },
];

export default function RecentTransactions() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-fadeIn">
      <p className="text-xs text-zinc-500 font-mono uppercase tracking-wider mb-4">
        Transações recentes
      </p>
      <div className="flex flex-col">
        {transactions.map((t, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2.5 border-b border-zinc-800 last:border-0"
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
              t.positive ? 'bg-green-950/40 text-green-400' : 'bg-zinc-800 text-zinc-500'
            }`}>
              {t.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-zinc-300 truncate">{t.name}</p>
              <p className="text-xs text-zinc-600 font-mono">{t.category}</p>
            </div>
            <p className={`text-sm font-mono font-medium ${t.positive ? 'text-green-400' : 'text-red-400'}`}>
              {t.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}