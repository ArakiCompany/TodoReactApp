'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function ProtectedLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-60" />
        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
      </div>
      <p className="text-xs font-mono text-zinc-600 animate-pulse">
        verificando sessão...
      </p>
    </div>
  );
}

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      setTimeout(() => setAuthorized(true), 0);
    }
  }, [router]);

  if (!authorized) return <ProtectedLoading />;

  return <>{children}</>;
}