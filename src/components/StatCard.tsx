import { ReactNode } from "react";

interface StatCardProps {
  id?: string;
  icon: ReactNode;
  label: string;
  value: string | number;
  subValue?: string;
}

export default function StatCard({ id, icon, label, value, subValue }: StatCardProps) {
  return (
    <div
      id={id}
      className="flex items-center gap-4 p-5 bg-zinc-50/80 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/80 rounded-2xl transition-all"
    >
      <div className="flex items-center justify-center p-3 bg-white dark:bg-zinc-800 text-indigo-500 dark:text-indigo-400 rounded-xl shadow-xs border border-zinc-200/40 dark:border-zinc-700/50 shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-mono">
          {label}
        </p>
        <p className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100 truncate leading-snug mt-0.5">
          {value}
        </p>
        {subValue && (
          <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-sans">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
}
