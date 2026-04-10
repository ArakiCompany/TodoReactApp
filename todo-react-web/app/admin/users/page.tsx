'use client';

import { useQuery, useMutation } from '@apollo/client/react';
import { gql } from '@apollo/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminRoute from '@/app/components/AdminRoute';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      role
      createdAt
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation UpdateUserRole($email: String!, $role: String!) {
    updateUserRole(input: { email: $email, role: $role })
  }
`;

interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

interface GetUsersResponse {
  users: User[];
}

const roles = ['User', 'Business', 'Admin'];

const roleStyles: Record<string, string> = {
  User: 'bg-zinc-800 text-zinc-400 border-zinc-700',
  Business: 'bg-indigo-950/40 text-indigo-400 border-indigo-900/40',
  Admin: 'bg-amber-950/40 text-amber-400 border-amber-900/40',
};

export default function UsersPage() {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { data, loading, refetch } = useQuery<GetUsersResponse>(GET_USERS, {
    fetchPolicy: 'network-only',
  });

  const [updateRole] = useMutation(UPDATE_ROLE);

  async function handleRoleChange(email: string, role: string) {
    setUpdating(email);
    setSuccess(null);
    try {
      await updateRole({ variables: { email, role } });
      await refetch();
      setSuccess(email);
      setTimeout(() => setSuccess(null), 2000);
    } finally {
      setUpdating(null);
    }
  }

  return (
    <AdminRoute>
      <div className="min-h-screen bg-zinc-950 p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-amber-600 rounded-lg flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87"/>
                  <path d="M16 3.13a4 4 0 010 7.75"/>
                </svg>
              </div>
              <div>
                <h1 className="text-base font-medium text-zinc-100">Usuários</h1>
                <p className="text-xs text-zinc-600 font-mono">{data?.users.length ?? 0} cadastrados</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/finances')}
                className="text-xs text-zinc-600 border border-zinc-800 rounded-lg px-3 py-1.5 hover:text-zinc-400 hover:border-zinc-700 transition"
              >
                ← financeiro
              </button>
              <button
                onClick={() => router.push('/todos')}
                className="text-xs text-zinc-600 border border-zinc-800 rounded-lg px-3 py-1.5 hover:text-zinc-400 hover:border-zinc-700 transition"
              >
                ← todos
              </button>
            </div>
          </div>

          {/* Legenda de roles */}
          <div className="flex gap-2 mb-6">
            {roles.map(r => (
              <span
                key={r}
                className={`text-xs font-mono px-2.5 py-1 rounded-full border ${roleStyles[r]}`}
              >
                {r}
              </span>
            ))}
            <span className="text-xs text-zinc-700 font-mono self-center ml-2">
              clique na role para alterar
            </span>
          </div>

          {/* Lista */}
          {loading ? (
            <div className="flex flex-col gap-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-16 bg-zinc-900 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {data?.users.map(user => (
                <div
                  key={user.id}
                  className="flex items-center gap-4 px-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition group"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-mono text-zinc-400">
                      {user.email[0].toUpperCase()}
                    </span>
                  </div>

                  {/* Email e data */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-zinc-300 truncate">{user.email}</p>
                    <p className="text-xs text-zinc-700 font-mono">
                      desde {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                    </p>
                  </div>

                  {/* Role atual */}
                  {success === user.email ? (
                    <span className="text-xs font-mono text-green-400 flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 13l4 4L19 7"/>
                      </svg>
                      atualizado
                    </span>
                  ) : (
                    <div className="flex gap-1.5">
                      {roles.map(role => (
                        <button
                          key={role}
                          onClick={() => user.role !== role && handleRoleChange(user.email, role)}
                          disabled={updating === user.email}
                          className={`text-xs font-mono px-2.5 py-1 rounded-full border transition ${
                            user.role === role
                              ? roleStyles[role]
                              : 'bg-transparent border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400'
                          } ${updating === user.email ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {updating === user.email && user.role !== role ? '...' : role}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  );
}