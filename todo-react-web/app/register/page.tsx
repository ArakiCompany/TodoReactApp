"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useRouter } from "next/navigation";

const REGISTER = gql`
  mutation Register($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      email
    }
  }
`;

interface RegisterResponse {
  register: { token: string; email: string };
}

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const [register, { loading, error }] =
    useMutation<RegisterResponse>(REGISTER);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLocalError("");

    if (password !== confirm) {
      setLocalError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setLocalError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const { data } = await register({ variables: { email, password } });
      if (data?.register.token) {
        localStorage.setItem("token", data.register.token);
        router.push("/todos");
      }
    } catch {}
  }

  const hasError = localError || error;

  return (
    <div className="min-h-screen flex">
      {/* Painel esquerdo */}
      <div className="hidden lg:flex lg:w-1/2 bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 50%, #6366f1 0%, transparent 60%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8l3 3 7-7"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              TodoApp
            </span>
          </div>
        </div>
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-white text-2xl font-semibold leading-snug">
              Comece a organizar
              <br />
              sua vida hoje
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Crie sua conta gratuitamente e tenha controle total das suas
              tarefas em qualquer lugar.
            </p>
          </div>
          <div className="space-y-3">
            {[
              "Cadastro gratuito e sem cartão",
              "Dados criptografados e seguros",
              "Acesso imediato após cadastro",
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5l2 2 4-4"
                      stroke="#818cf8"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="text-zinc-400 text-sm">{text}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-zinc-800 pt-6">
            <p className="text-zinc-500 text-xs">
              © 2025 TodoApp. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Painel direito */}
      <div className="flex-1 flex items-center justify-center bg-white dark:bg-zinc-900 p-8">
        <div className="w-full max-w-sm space-y-8">
          {/* Header */}
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white tracking-tight">
              Criar conta
            </h1>
            <p className="text-sm text-zinc-500">
              Preencha os dados abaixo para começar
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@email.com"
                required
                className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  required
                  className="w-full px-3.5 py-2.5 pr-10 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Força da senha */}
              {password.length > 0 && (
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          password.length >= i * 3
                            ? i <= 1
                              ? "bg-red-400"
                              : i <= 2
                                ? "bg-amber-400"
                                : i <= 3
                                  ? "bg-yellow-400"
                                  : "bg-green-400"
                            : "bg-zinc-200 dark:bg-zinc-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400">
                    {password.length < 3
                      ? "Muito fraca"
                      : password.length < 6
                        ? "Fraca"
                        : password.length < 9
                          ? "Boa"
                          : "Forte"}
                  </p>
                </div>
              )}
            </div>

            {/* Confirmar senha */}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repita sua senha"
                required
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${
                  confirm.length > 0 && confirm !== password
                    ? "border-red-300 dark:border-red-700"
                    : "border-zinc-200 dark:border-zinc-700"
                }`}
              />
              {confirm.length > 0 && confirm !== password && (
                <p className="text-xs text-red-500">As senhas não coincidem</p>
              )}
            </div>

            {/* Erro */}
            {hasError && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-red-500 flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="text-xs text-red-600 dark:text-red-400">
                  {localError || "Este email já está cadastrado."}
                </p>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Criando conta...
                </>
              ) : (
                "Criar conta"
              )}
            </button>
          </form>

          {/* Rodapé */}
          <p className="text-center text-sm text-zinc-500">
            Já tem uma conta?{" "}
            <a
              href="/login"
              className="text-indigo-600 hover:text-indigo-700 font-medium transition"
            >
              Entrar
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
