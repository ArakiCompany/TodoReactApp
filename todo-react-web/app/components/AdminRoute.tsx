'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, isAuthenticated } from '@/lib/auth';

function AdminLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-amber-500 animate-ping opacity-60" />
        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4"/>
            <path d="M6 20v-2a6 6 0 0112 0v2"/>
            <path d="M18 14l2 2 4-4"/>
          </svg>
        </div>
      </div>
      <p className="text-xs font-mono text-amber-900 animate-pulse">
        verificando permissões...
      </p>
    </div>
  );
}

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }
    if (!isAdmin()) {
      router.push('/todos');
      return;
    }
    setTimeout(() => setAuthorized(true), 0);
  }, [router]);

  if (!authorized) return <AdminLoading />;

  return <>{children}</>;
}