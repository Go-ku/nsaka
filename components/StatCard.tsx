import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  hint?: string;
  icon?: ReactNode;
  tone?: 'default' | 'accent';
}

export function StatCard({ label, value, hint, icon, tone = 'default' }: Props) {
  return (
    <div className={cn('card p-4 flex flex-col gap-3', tone === 'accent' && 'bg-gradient-to-br from-primary/40 to-slate-900') }>
      <div className="flex items-center justify-between text-slate-400 text-sm">
        <span className="flex items-center gap-2">{icon}{label}</span>
        {hint && <span className="text-xs text-slate-500">{hint}</span>}
      </div>
      <div className="text-2xl font-semibold text-slate-50">{value}</div>
    </div>
  );
}
