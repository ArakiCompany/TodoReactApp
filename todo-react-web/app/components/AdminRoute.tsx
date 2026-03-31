'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, isAuthenticated } from '@/lib/auth';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    if (!isAdmin()) {
      router.push('/todos'); // redireciona para home se não for admin
      return;
    }

    setTimeout(() => setAuthorized(true), 0);
  }, [router]);

  if (!authorized) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p>Verificando permissões...</p>
      </div>
    );
  }

  return <>{children}</>;
}