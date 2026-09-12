import { WorkoutLog } from '../../types/workout.types';
import LogHistoryItem from './LogHistoryItem';
import EmptyState from '../shared/EmptyState';

interface Props {
  logs: WorkoutLog[];
  loading: boolean;
  onDelete: (id: string) => void;
}

export default function LogHistory({ logs, loading, onDelete }: Props) {
  return (
    <div>
      <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
        Últimos 30 dias
      </p>
      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[1,2,3].map(i => <div key={i} className="h-16 bg-zinc-900 rounded-xl" />)}
        </div>
      ) : logs.length === 0 ? (
        <EmptyState emoji="📋" title="Nenhum treino registrado ainda" />
      ) : (
        <div className="space-y-2">
          {logs.map(log => (
            <LogHistoryItem key={log.id} log={log} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}