"use client";

import { useRouter } from "next/navigation";
import { isAdmin, isBusiness } from "@/lib/auth";
import { resetClient } from "@/lib/apolloClient";

interface Props {
  total: number;
  done: number;
  pending: number;
}

export default function TodoHeader({ total, done, pending }: Props) {
  const router = useRouter();
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const admin = isAdmin();
  const business = isBusiness();

  function handleLogout() {
    localStorage.removeItem("token");
    resetClient();
    router.push("/login");
  }

  return (
    <>
      <div className="flex gap-2">
        {business && (
          <a
            href="/finances"
            className="text-xs text-indigo-400 border border-indigo-900/50 rounded-md px-2.5 py-1 hover:text-indigo-300 transition"
          >
            financeiro →
          </a>
        )}
        {admin && (
          <a
            href="/admin/users"
            className="text-xs text-amber-400 border border-amber-900/50 rounded-md px-2.5 py-1 hover:text-amber-300 transition"
          >
            usuários →
          </a>
        )}
        <button
          onClick={handleLogout}
          className="text-xs text-zinc-600 border border-zinc-800 rounded-md px-2.5 py-1 hover:text-zinc-400 hover:border-zinc-700 transition"
        >
          sair →
        </button>
      </div>

      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-xl font-medium text-zinc-100 tracking-tight">
            Minhas Tarefas
          </h1>
          <p className="text-xs text-zinc-600 mt-1 font-mono">{today}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <button
            onClick={handleLogout}
            className="text-xs text-zinc-600 border border-zinc-800 rounded-md px-2.5 py-1 hover:text-zinc-400 hover:border-zinc-700 transition"
          >
            sair →
          </button>
          <div className="flex gap-1.5">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-zinc-900 text-zinc-500 border border-zinc-800">
              {total} total
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-green-950/30 text-green-400 border border-green-900/30">
              {done} feitas
            </span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-950/30 text-indigo-400 border border-indigo-900/30">
              {pending} pendentes
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
