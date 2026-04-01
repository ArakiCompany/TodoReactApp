'use client';

import { useState } from 'react';
import { useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/navigation';

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      token
      email
      role
    }
  }
`;

interface LoginResponse {
  login: { token: string; email: string };
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [login, { loading, error }] = useMutation<LoginResponse>(LOGIN);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { email, password } });
      if (data?.login.token) {
        localStorage.setItem('token', data.login.token);
        await new Promise(resolve => setTimeout(resolve, 100));
        router.push('/todos');
      }
    } catch {}
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex">

      {/* Painel esquerdo — só desktop */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden bg-zinc-950 border-r border-zinc-900">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 30% 50%, rgba(99,102,241,0.1) 0%, transparent 60%)' }}
        />
        <div className="relative z-10 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span className="text-white font-medium text-base">TodoApp</span>
        </div>
        <div className="relative z-10 space-y-6">
          <div>
            <h2 className="text-white text-3xl font-medium leading-tight tracking-tight mb-3">
              Organize sua vida<br />com eficiência
            </h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Gerencie suas tarefas de forma simples e segura, de qualquer lugar.
            </p>
          </div>
          <div className="space-y-3">
            {['Cadastro gratuito e sem cartão', 'Dados criptografados e seguros', 'Acesso de qualquer dispositivo'].map((text, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-950/50 border border-indigo-900/50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <path d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <span className="text-zinc-500 text-sm">{text}</span>
              </div>
            ))}
          </div>
          <p className="text-zinc-700 text-xs border-t border-zinc-900 pt-6">© 2026 TodoApp</p>
        </div>
      </div>

      {/* Painel direito — full mobile, metade desktop */}
      <div className="flex-1 flex flex-col justify-between lg:justify-center px-6 py-10 lg:px-12">

        {/* Logo mobile */}
        <div className="flex items-center gap-2 lg:hidden mb-10">
          <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center">
            <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <span className="text-white font-medium text-base">TodoApp</span>
        </div>

        <div className="w-full max-w-sm mx-auto lg:mx-0 space-y-8">
          <div>
            <h1 className="text-2xl lg:text-xl font-medium text-zinc-100 tracking-tight">
              Bem-vindo de volta
            </h1>
            <p className="text-sm text-zinc-500 mt-1">
              Entre na sua conta para continuar
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="voce@email.com"
                required
                className="w-full px-4 py-3.5 lg:py-2.5 text-sm rounded-xl lg:rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3.5 lg:py-2.5 pr-11 text-sm rounded-xl lg:rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-100 placeholder-zinc-700 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 px-4 py-3 bg-red-950/20 border border-red-900/30 rounded-xl">
                <svg className="w-4 h-4 text-red-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p className="text-xs text-red-400">Email ou senha incorretos</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 lg:py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white text-sm font-medium rounded-xl lg:rounded-lg transition flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Entrando...
                </>
              ) : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-600">
            Não tem uma conta?{' '}
            <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition">
              Cadastre-se
            </a>
          </p>
        </div>

        {/* Footer mobile */}
        <p className="text-center text-xs text-zinc-800 lg:hidden mt-8">© 2026 TodoApp</p>
      </div>
    </div>
  );
}