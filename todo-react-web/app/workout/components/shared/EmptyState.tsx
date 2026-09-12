interface Props {
  emoji: string;
  title: string;
  subtitle?: string;
}

export default function EmptyState({ emoji, title, subtitle }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-zinc-700">
      <span className="text-4xl mb-3">{emoji}</span>
      <p className="text-sm">{title}</p>
      {subtitle && <p className="text-xs mt-1">{subtitle}</p>}
    </div>
  );
}