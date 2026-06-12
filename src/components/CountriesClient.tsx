import React, { useState, useMemo, useEffect } from "react";
import { Country } from "../types";
import SearchBar from "./SearchBar";
import RegionFilter from "./RegionFilter";
import SortDropdown from "./SortDropdown";
import CountryCard from "./CountryCard";
import { useDebounce } from "../hooks/useDebounce";
import { Inbox } from "lucide-react";

interface CountriesClientProps {
  countries: Country[];
}

export default function CountriesClient({ countries }: CountriesClientProps) {
  const [search, setSearch] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name-asc");
  const [visibleCount, setVisibleCount] = useState<number>(24);

  const debouncedSearch = useDebounce<string>(search, 300);

  // Reset page limit on filters or search change
  useEffect(() => {
    setVisibleCount(24);
  }, [debouncedSearch, selectedRegion, sortBy]);

  const filteredAndSortedCountries = useMemo(() => {
    let result = [...countries];

    // Search match: name, official, capital name
    if (debouncedSearch.trim() !== "") {
      const term = debouncedSearch.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.name.common.toLowerCase().includes(term) ||
          c.name.official.toLowerCase().includes(term) ||
          (c.capital && c.capital.some((cap) => cap.toLowerCase().includes(term)))
      );
    }

    // Region Match
    if (selectedRegion !== "all") {
      result = result.filter((c) => c.region === selectedRegion);
    }

    // Sorting algorithm
    result.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.common.localeCompare(b.name.common);
      } else if (sortBy === "name-desc") {
        return b.name.common.localeCompare(a.name.common);
      } else if (sortBy === "pop-desc") {
        return b.population - a.population;
      } else if (sortBy === "pop-asc") {
        return a.population - b.population;
      } else if (sortBy === "area-desc") {
        return (b.area || 0) - (a.area || 0);
      } else if (sortBy === "area-asc") {
        return (a.area || 0) - (b.area || 0);
      }
      return 0;
    });

    return result;
  }, [countries, debouncedSearch, selectedRegion, sortBy]);

  const visibleCountries = useMemo(() => {
    return filteredAndSortedCountries.slice(0, visibleCount);
  }, [filteredAndSortedCountries, visibleCount]);

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 24, filteredAndSortedCountries.length));
  };

  return (
    <div className="space-y-8">
      {/* Custom Control Bar with search, region filter and sort */}
      <div className="flex flex-col lg:flex-row gap-6 items-stretch lg:items-end justify-between bg-zinc-50/50 dark:bg-zinc-900/30 p-6 sm:p-8 rounded-3xl border border-zinc-100/80 dark:border-zinc-800">
        <div className="flex-1 space-y-4">
          <SearchBar value={search} onChange={setSearch} />
          <RegionFilter selectedRegion={selectedRegion} onChange={setSelectedRegion} />
        </div>
        <div className="shrink-0">
          <SortDropdown sortBy={sortBy} onChange={setSortBy} />
        </div>
      </div>

      {/* Meta counters */}
      <div className="flex justify-between items-center text-xs font-bold tracking-wider font-mono text-zinc-400 dark:text-zinc-505">
        <span>KO'RSATILMOQDA: {Math.min(visibleCountries.length, filteredAndSortedCountries.length)} / {filteredAndSortedCountries.length} ta davlat</span>
        {filteredAndSortedCountries.length === 0 && <span>Natija yo'q</span>}
      </div>

      {/* Main Grid display */}
      {visibleCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl">
          <div className="text-zinc-300 dark:text-zinc-700 mx-auto w-14 h-14 mb-4 flex items-center justify-center">
            <Inbox size={42} />
          </div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-1">Hech narsa topilmadi</h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
            Siz kiritgan qidiruv yoki filter mezonlariga mos davlatlar mavjud emas. Filterni o'zgartirib ko'ring.
          </p>
        </div>
      )}

      {/* Smart Paginated loading button */}
      {filteredAndSortedCountries.length > visibleCount && (
        <div className="flex justify-center pt-8">
          <button
            onClick={loadMore}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-zinc-700 dark:text-zinc-200 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:shadow-xs active:scale-[0.98] transition-all rounded-xl cursor-pointer"
          >
            Ko'proq davlatlar ko'rsatish ({filteredAndSortedCountries.length - visibleCount} qoldi)
          </button>
        </div>
      )}
    </div>
  );
}
