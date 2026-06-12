import { Globe2 } from "lucide-react";

interface RegionFilterProps {
  selectedRegion: string;
  onChange: (region: string) => void;
}

const REGIONS = [
  { value: "all", label: "Barchasi" },
  { value: "Africa", label: "Afrika" },
  { value: "Americas", label: "Amerika" },
  { value: "Asia", label: "Osiyo" },
  { value: "Europe", label: "Yevropa" },
  { value: "Oceania", label: "Okeaniya" },
  { value: "Antarctic", label: "Antarktika" },
];

export default function RegionFilter({ selectedRegion, onChange }: RegionFilterProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5 font-mono">
        <Globe2 size={13} className="text-zinc-400 dark:text-zinc-500 animate-spin-slow" /> HUDUD BO'YICHA FILTR
      </span>
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none [mask-image:linear-gradient(to_right,white_90%,transparent)]">
        {REGIONS.map((region) => {
          const isActive = selectedRegion === region.value;
          return (
            <button
              key={region.value}
              id={`region-btn-${region.value.toLowerCase()}`}
              type="button"
              onClick={() => onChange(region.value)}
              className={`px-4 py-2 text-xs font-semibold rounded-xl cursor-pointer transition-all whitespace-nowrap border outline-none ${
                isActive
                  ? "bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200/30"
                  : "bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40"
              }`}
            >
              {region.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
