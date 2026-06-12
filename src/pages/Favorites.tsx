import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { fetchAllCountries } from "../lib/api";
import { Country } from "../types";
import { useFavorites } from "../hooks/useFavorites";
import CountryCard from "../components/CountryCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { Heart, Compass, ArrowLeft } from "lucide-react";

export default function Favorites() {
  const { favorites } = useFavorites();
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
      setError(err.message || "Ma'lumotlarni yuklab bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const favoriteCountries = useMemo(() => {
    const favoriteCodes = favorites.map((c) => c.toUpperCase());
    return countries.filter((c) => favoriteCodes.includes(c.cca3.toUpperCase()));
  }, [countries, favorites]);

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

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Navigation and description */}
      <div className="space-y-2">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-indigo-600 transition-colors uppercase font-mono tracking-widest cursor-pointer outline-none"
        >
          <ArrowLeft size={13} /> Bosh sahifaga qaytish
        </Link>
        
        <div className="flex items-center gap-2.5">
          <div className="p-2 sm:p-2.5 bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 rounded-xl border border-rose-100 dark:border-rose-900/30">
            <Heart size={20} className="fill-current animate-pulse text-rose-500" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Saralangan Mamlakatlar
          </h1>
        </div>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xl font-sans leading-relaxed">
          Siz saqlab qo'ygan sevimli davlatlaringiz ro'yxati. Bu ma'lumotlar localStorage orqali brauzeringizda xavfsiz holatda saqlanadi.
        </p>
      </div>

      {/* Grid items block */}
      {favoriteCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
          {favoriteCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 px-4 bg-zinc-50/50 dark:bg-zinc-900/10 border border-dashed border-zinc-200 dark:border-zinc-850 rounded-3xl max-w-2xl mx-auto">
          <div className="text-rose-300 dark:text-rose-950 mx-auto w-14 h-14 mb-4 flex items-center justify-center">
            <Heart size={44} className="stroke-current text-rose-300 dark:text-rose-900" />
          </div>
          <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-1">
            Saralangan davlatlar ro'yxati bo'sh
          </h4>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto leading-relaxed">
            Hali bironta ham mamlakatni sevimlilar ro'yxatiga qo'shmadingiz. Qidiruv bo'limidan foydalanib saralanganlar ro'yxatini to'ldiring!
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Compass size={16} /> Davlatlarni kashf etish
          </Link>
        </div>
      )}
    </div>
  );
}
