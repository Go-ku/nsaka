'use client';

import { cn } from '@/lib/utils';

interface Props {
  status: string;
}

const palette: Record<string, string> = {
  Active: 'bg-emerald-500/20 text-emerald-200 border-emerald-500/40',
  'Ending Soon': 'bg-amber-500/20 text-amber-100 border-amber-500/40',
  Expired: 'bg-rose-500/20 text-rose-100 border-rose-500/40',
  Overdue: 'bg-rose-500/20 text-rose-100 border-rose-500/40',
  Pending: 'bg-sky-500/20 text-sky-100 border-sky-500/40',
  Completed: 'bg-emerald-500/20 text-emerald-100 border-emerald-500/40',
  Scheduled: 'bg-indigo-500/20 text-indigo-100 border-indigo-500/40',
  Open: 'bg-amber-500/20 text-amber-100 border-amber-500/40',
  Sent: 'bg-cyan-500/20 text-cyan-100 border-cyan-500/40',
  Paid: 'bg-emerald-600/20 text-emerald-100 border-emerald-500/40'
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={cn(
        'badge border',
        palette[status] ?? 'bg-slate-700 text-slate-200 border-slate-600'
      )}
    >
      {status}
    </span>
  );
}
