interface Props {
  saving: boolean;
  saved: boolean;
  onClick: () => void;
}

export default function SaveButton({ saving, saved, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={saving}
      className="w-full py-3 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 active:scale-[0.98] bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white"
    >
      {saving ? (
        <>
          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 11-6.219-8.56"/>
          </svg>
          Salvando...
        </>
      ) : saved ? (
        <>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          Salvo no banco!
        </>
      ) : (
        <>
          Salvar e atualizar dashboard
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </>
      )}
    </button>
  );
}