import { useEffect, useState } from "react";
import { fetchAllCountries } from "../lib/api";
import { Country } from "../types";
import CountriesClient from "../components/CountriesClient";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Compass } from "lucide-react";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAllCountries();
      setCountries(data);
    } catch (e) {
      const err = e as Error;
      setError(err.message || "Ma'lumotlarni yuklab bo'lmadi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="py-12">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadData} />;
  }

  const totalPopulation = countries.reduce((sum, c) => sum + (c.population || 0), 0);
  const totalCountries = countries.length;

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Visual Header Panel with Bold Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-850">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100/60 dark:border-indigo-900/40 rounded-full uppercase tracking-wider">
            <Compass size={13} className="animate-spin-slow text-indigo-500" /> DUNYONI O'RGANISH VAQTI KELDI
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-zinc-950 dark:text-white tracking-tighter leading-none uppercase">
            DUNYO HUDUDLARI <br /> SIZNING QO'LINGIZDA
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium">
            REST Countries ma'lumotlar bazasidan jami {totalCountries} ta mamlakat tafsilotlari.
          </p>
        </div>
        
        {/* Statistics Panels from Bold Typography Theme */}
        <div className="flex items-center gap-6 shrink-0 bg-white dark:bg-zinc-900 px-6 py-4 rounded-2xl border border-zinc-200/55 dark:border-zinc-800/80 shadow-2xs">
          <div className="text-left md:text-right">
            <div className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white leading-none">
              {(totalPopulation / 1e9).toFixed(2)} mlrd
            </div>
            <div className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1.5 font-mono">
              JAMI AHOLI
            </div>
          </div>
          <div className="w-px h-10 bg-zinc-200 dark:bg-zinc-800"></div>
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-extrabold text-zinc-950 dark:text-white leading-none">
              {totalCountries}
            </div>
            <div className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-1.5 font-mono">
              DAVLATLAR
            </div>
          </div>
        </div>
      </div>

      <CountriesClient countries={countries} />
    </div>
  );
}
