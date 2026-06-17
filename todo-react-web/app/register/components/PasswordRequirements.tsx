interface Requirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: Requirement[] = [
  { label: 'Mínimo 6 caracteres', test: p => p.length >= 6 },
  { label: 'Máximo 100 caracteres', test: p => p.length <= 100 },
  { label: 'Pelo menos uma letra maiúscula', test: p => /[A-Z]/.test(p) },
  { label: 'Pelo menos um número', test: p => /[0-9]/.test(p) },
];

interface Props {
  password: string;
}

export default function PasswordRequirements({ password }: Props) {
  const allMet = requirements.every(r => r.test(password));

  return (
    <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg space-y-1.5">
      {requirements.map((req, i) => {
        const met = req.test(password);
        return (
          <div
            key={i}
            className="flex items-center gap-2 transition-all duration-200"
          >
            {/* Ícone */}
            <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              met
                ? 'bg-green-500/20 border border-green-500/40'
                : 'bg-zinc-200 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600'
            }`}>
              {met ? (
                <svg className="w-2.5 h-2.5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M5 13l4 4L19 7"/>
                </svg>
              ) : (
                <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              )}
            </div>

            {/* Label */}
            <span className={`text-xs transition-colors duration-200 ${
              met
                ? 'text-green-600 dark:text-green-400'
                : 'text-zinc-500 dark:text-zinc-400'
            }`}>
              {req.label}
            </span>
          </div>
        );
      })}

      {/* Barra de progresso */}
      <div className="mt-2 pt-2 border-t border-zinc-200 dark:border-zinc-700">
        <div className="flex gap-1">
          {requirements.map((req, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                req.test(password)
                  ? 'bg-green-500'
                  : 'bg-zinc-200 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>
        <p className={`text-xs mt-1.5 transition-colors duration-200 ${
          allMet ? 'text-green-600 dark:text-green-400' : 'text-zinc-400'
        }`}>
          {requirements.filter(r => r.test(password)).length}/{requirements.length} requisitos atendidos
          {allMet && ' ✓'}
        </p>
      </div>
    </div>
  );
}