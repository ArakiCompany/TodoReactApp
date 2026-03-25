"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { useState } from "react";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import TodoHeader from "./components/TodoHeader";
import TodoInput from "./components/TodoInput";
import TodoFilters, { Filter } from "./components/TodoFilters";
import TodoItem from "./components/TodoItem";
import TodoEmpty from "./components/TodoEmpty";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      isCompleted
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($title: String!) {
    addTodo(title: $title) {
      id
      title
      isCompleted
    }
  }
`;

const COMPLETE_TODO = gql`
  mutation CompleteTodo($id: String!) {
    completeTodo(id: $id) {
      id
      isCompleted
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id)
  }
`;

interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

interface GetTodosResponse {
  todos: Todo[];
}

export default function TodosPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const [addingTodo, setAddingTodo] = useState(false);

  const [skipQuery] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    return !localStorage.getItem("token");
  });

  const { data, refetch } = useQuery<GetTodosResponse>(GET_TODOS, {
    skip: skipQuery,
    fetchPolicy: "network-only",
    ssr: false,
  });

  const [addTodo] = useMutation(ADD_TODO);
  const [completeTodo] = useMutation(COMPLETE_TODO);
  const [deleteTodo] = useMutation(DELETE_TODO);

  const todos = data?.todos ?? [];
  const done = todos.filter((t) => t.isCompleted).length;
  const pending = todos.filter((t) => !t.isCompleted).length;

  const filtered = todos.filter((t) => {
    if (filter === "done") return t.isCompleted;
    if (filter === "pending") return !t.isCompleted;
    return true;
  });

  async function handleAdd(title: string) {
    setAddingTodo(true);
    await addTodo({ variables: { title } });
    await refetch();
    setAddingTodo(false);
  }

  async function handleComplete(id: string) {
    await completeTodo({ variables: { id } });
    await refetch();
  }

  async function handleDelete(id: string) {
    await deleteTodo({ variables: { id } });
    await refetch();
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-950 relative overflow-hidden">
        <div
          className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
          }}
        />

        {/* Container responsivo */}
        <div className="relative z-10 min-h-screen flex flex-col">
          <div className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
            <TodoHeader total={todos.length} done={done} pending={pending} />
            <TodoInput onAdd={handleAdd} loading={addingTodo} />
            <TodoFilters active={filter} onChange={setFilter} />

            <div className="flex flex-col gap-2">
              {filtered.length === 0 ? (
                <TodoEmpty />
              ) : (
                filtered.map((todo, i) => (
                  <TodoItem
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    isCompleted={todo.isCompleted}
                    index={i}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
