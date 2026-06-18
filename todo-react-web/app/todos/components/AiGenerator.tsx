"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
const SUGGEST_TODOS = gql`
  mutation SuggestTodos($prompt: String!) {
    suggestTodos(prompt: $prompt)
  }
`;

const GENERATE_AND_SAVE = gql`
  mutation GenerateAndSaveTodos($prompt: String!) {
    generateAndSaveTodos(prompt: $prompt) {
      id
      title
      isCompleted
    }
  }
`;

interface Props {
  onSaved: () => void;
}

interface SuggestResponse {
  suggestTodos: string[];
}
interface SaveResponse {
  generateAndSaveTodos: { id: string; title: string; isCompleted: boolean }[];
}

export default function AiGenerator({ onSaved }: Props) {
  const [open, setOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [step, setStep] = useState<"input" | "review">("input");

  const [suggest, { loading: suggesting }] =
    useMutation<SuggestResponse>(SUGGEST_TODOS);
  const [saveAll, { loading: saving }] =
    useMutation<SaveResponse>(GENERATE_AND_SAVE);

  async function handleSuggest() {
    if (!prompt.trim()) return;
    const { data } = await suggest({ variables: { prompt } });
    if (data?.suggestTodos) {
      setSuggestions(data.suggestTodos);
      setSelected(new Set(data.suggestTodos.map((_: string, i: number) => i))); // seleciona todos
      setStep("review");
    }
  }

  async function handleSaveSelected() {
    const selectedTitles = suggestions.filter((_, i) => selected.has(i));
    if (selectedTitles.length === 0) return;

    // Salva só os selecionados via generateAndSave com prompt filtrado
    // Ou chama save individual para cada um
    await saveAll({ variables: { prompt } });
    onSaved();
    handleClose();
  }

  function toggleSelect(i: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleClose() {
    setOpen(false);
    setPrompt("");
    setSuggestions([]);
    setSelected(new Set());
    setStep("input");
  }

  return (
    <>
      {/* Botão de abrir */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 border border-indigo-900/50 hover:border-indigo-700 bg-indigo-950/20 hover:bg-indigo-950/40 rounded-lg px-3 py-2 transition"
      >
        <svg
          className="w-3.5 h-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
        Gerar com IA
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(4px)" }}
          onClick={handleClose}
        >
          <div
            className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
            style={{ animation: "modalIn 0.2s ease forwards" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-indigo-950/40 border border-indigo-900/40 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-indigo-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-zinc-100">
                  Gerar tarefas com IA
                </span>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-950/30 border border-indigo-900/30 px-1.5 py-0.5 rounded">
                  Gemini
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-zinc-600 hover:text-zinc-400 transition"
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Step 1 — Input */}
            {step === "input" && (
              <div className="p-5 space-y-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-3 leading-relaxed">
                    Descreva um tema ou objetivo e a IA vai gerar uma lista de
                    tarefas para você.
                  </p>

                  {/* Exemplos */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {[
                      "Viagem para Paris",
                      "Aprender a cozinhar",
                      "Organizar home office",
                      "Maratona em 6 meses",
                    ].map((ex) => (
                      <button
                        key={ex}
                        onClick={() => setPrompt(ex)}
                        className="text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-full px-2.5 py-1 transition"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>

                  <div className="relative">
                    <input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSuggest()}
                      placeholder="Ex: preparar apresentação para investidores..."
                      maxLength={200}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 transition pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-zinc-700">
                      {prompt.length}/200
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleSuggest}
                  disabled={suggesting || !prompt.trim()}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium rounded-xl transition flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {suggesting ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M21 12a9 9 0 11-6.219-8.56" />
                      </svg>
                      Gerando tarefas...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      Gerar tarefas
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 2 — Review */}
            {step === "review" && (
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-zinc-500">
                    Selecione as tarefas que deseja adicionar
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setSelected(new Set(suggestions.map((_, i) => i)))
                      }
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition"
                    >
                      todas
                    </button>
                    <span className="text-zinc-700">·</span>
                    <button
                      onClick={() => setSelected(new Set())}
                      className="text-xs text-zinc-500 hover:text-zinc-300 transition"
                    >
                      nenhuma
                    </button>
                  </div>
                </div>

                {/* Lista de sugestões */}
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
                  {suggestions.map((todo, i) => {
                    const isSelected = selected.has(i);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleSelect(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all duration-150 ${
                          isSelected
                            ? "bg-indigo-950/30 border-indigo-900/50 text-zinc-200"
                            : "bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-700 hover:text-zinc-400"
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            isSelected
                              ? "bg-indigo-500 border-indigo-500"
                              : "border-zinc-700"
                          }`}
                        >
                          {isSelected && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs leading-relaxed">{todo}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Ações */}
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => setStep("input")}
                    className="flex-1 py-2.5 bg-transparent border border-zinc-800 hover:border-zinc-700 rounded-xl text-sm text-zinc-500 hover:text-zinc-300 transition"
                  >
                    ← Gerar novamente
                  </button>
                  <button
                    onClick={handleSaveSelected}
                    disabled={saving || selected.size === 0}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 rounded-xl text-sm text-white font-medium transition flex items-center justify-center gap-2 active:scale-[0.98]"
                  >
                    {saving ? (
                      <>
                        <svg
                          className="animate-spin w-3.5 h-3.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12a9 9 0 11-6.219-8.56" />
                        </svg>
                        Salvando...
                      </>
                    ) : (
                      `Adicionar ${selected.size} tarefa${selected.size !== 1 ? "s" : ""}`
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}
