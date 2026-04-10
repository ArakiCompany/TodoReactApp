'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserRole, isAuthenticated } from '@/lib/auth';

function BusinessLoading() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-4">
      <div className="relative w-12 h-12 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-60" />
        <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center">
          <svg className="w-5 h-5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
      </div>
      <p className="text-xs font-mono text-indigo-700 animate-pulse">
        verificando acesso...
      </p>
    </div>
  );
}

export default function BusinessRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    const role = getUserRole();
    const hasAccess = role === 'Business' || role === 'Admin';

    if (!hasAccess) {
      router.push('/todos');
      return;
    }

    setTimeout(() => setAuthorized(true), 0);
  }, [router]);

  if (!authorized) return <BusinessLoading />;
  return <>{children}</>;
}