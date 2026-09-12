const EMOJIS = ['🦵', '💪', '🏋️', '🔥', '⚡', '🎯', '💥', '🦾', '🏃', '🤸'];

interface Props {
  value: string;
  onChange: (emoji: string) => void;
}

export default function EmojiPicker({ value, onChange }: Props) {
  return (
    <div>
      <label className="block text-xs font-medium text-zinc-400 mb-2">Ícone</label>
      <div className="flex flex-wrap gap-2">
        {EMOJIS.map(emoji => (
          <button
            key={emoji}
            type="button"
            onClick={() => onChange(emoji)}
            className={`w-10 h-10 flex items-center justify-center rounded-xl text-xl transition ${
              value === emoji
                ? 'bg-indigo-600 ring-2 ring-indigo-400'
                : 'bg-zinc-800 hover:bg-zinc-700'
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}