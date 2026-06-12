import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = "Mamlakat nomi (masalan: O'zbekiston, Japan)..." }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-400 dark:text-zinc-500">
        <Search size={20} />
      </div>
      <input
        type="text"
        id="country-search-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-12 pr-12 py-3 text-sm rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 placeholder-zinc-400 focus:outline-hidden focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 shadow-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
      />
      {value && (
        <button
          type="button"
          id="clear-search-btn"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer transition-colors"
          title="Tozalash"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
