'use client';

import { useEffect } from 'react';

interface Props {
  isOpen: boolean;
  email: string;
  fromRole: string;
  toRole: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const roleStyles: Record<string, string> = {
  User: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  Business: 'bg-indigo-950/40 text-indigo-400 border-indigo-900/40',
  Admin: 'bg-amber-950/40 text-amber-400 border-amber-900/40',
};

const roleIcons: Record<string, string> = {
  User: '→ User',
  Business: '→ Business',
  Admin: '→ Admin',
};

export default function RoleModal({ isOpen, email, fromRole, toRole, loading, onConfirm, onCancel }: Props) {
  // Fechar com ESC
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onCancel();
    }
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-2xl"
        style={{ animation: 'modalIn 0.2s ease forwards' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Ícone */}
        <div className="w-12 h-12 mx-auto mb-4 bg-indigo-950/40 border border-indigo-900/40 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 00-3-3.87"/>
            <path d="M16 3.13a4 4 0 010 7.75"/>
          </svg>
        </div>

        {/* Título */}
        <h2 className="text-base font-medium text-zinc-100 text-center mb-1">
          Alterar perfil do usuário
        </h2>
        <p className="text-sm text-zinc-500 text-center mb-5 leading-relaxed">
          Tem certeza que deseja alterar o perfil de{' '}
          <span className="text-zinc-300 font-medium">{email}</span>?
        </p>

        {/* Role change visual */}
        <div className="flex items-center justify-center gap-3 mb-5 p-3 bg-zinc-950 rounded-xl border border-zinc-800">
          <span className={`text-xs font-mono px-3 py-1 rounded-full border ${roleStyles[fromRole]}`}>
            {fromRole}
          </span>
          <svg className="w-4 h-4 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          <span className={`text-xs font-mono px-3 py-1 rounded-full border ${roleStyles[toRole]}`}>
            {toRole}
          </span>
        </div>

        {/* Aviso */}
        <p className="text-xs text-zinc-600 text-center font-mono mb-5">
          {toRole === 'Admin' && '⚠ Admin tem acesso total ao sistema'}
          {toRole === 'Business' && '◆ Business terá acesso ao painel financeiro'}
          {toRole === 'User' && '○ User terá acesso apenas às tarefas'}
        </p>

        {/* Botões */}
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2.5 bg-transparent border border-zinc-800 rounded-xl text-sm text-zinc-500 hover:text-zinc-300 hover:border-zinc-700 transition disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm text-white font-medium transition disabled:opacity-50 flex items-center justify-center gap-2 active:scale-95"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12a9 9 0 11-6.219-8.56"/>
                </svg>
                Salvando...
              </>
            ) : 'Confirmar'}
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}