import { ArrowUpDown } from "lucide-react";

interface SortDropdownProps {
  sortBy: string;
  onChange: (sortVal: string) => void;
}

export default function SortDropdown({ sortBy, onChange }: SortDropdownProps) {
  return (
    <div className="flex flex-col gap-2 w-full sm:w-64">
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-mono">
        <ArrowUpDown size={13} className="text-zinc-400 dark:text-zinc-500" /> TARTIBLASH
      </span>
      <div className="relative w-full">
        <select
          id="sort-select-field"
          value={sortBy}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none pl-4 pr-10 py-3 text-sm rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer"
        >
          <option value="name-asc">Alifbo bo'yicha (A-Z)</option>
          <option value="name-desc">Alifbo bo'yicha (Z-A)</option>
          <option value="pop-desc">Aholi soni (Kamayuvchi)</option>
          <option value="pop-asc">Aholi soni (O'suvchi)</option>
          <option value="area-desc">Maydoni (Kamayuvchi)</option>
          <option value="area-asc">Maydoni (O'suvchi)</option>
        </select>
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
