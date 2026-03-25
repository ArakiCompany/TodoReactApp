export default function TodoEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-zinc-700">
      <div className="w-10 h-10 border-2 border-dashed border-zinc-800 rounded-xl flex items-center justify-center mb-3">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      </div>
      <p className="text-sm">Nenhuma tarefa ainda</p>
      <p className="text-xs mt-1 text-zinc-800">Adicione sua primeira tarefa acima</p>
    </div>
  );
}