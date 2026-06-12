import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchCountryByCca3 } from "../lib/api";
import { Country } from "../types";
import { formatPopulation, formatArea, listLanguages, listCurrencies, listCapitals } from "../utils/formatters";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import StatCard from "../components/StatCard";
import BorderCountry from "../components/BorderCountry";
import FavoriteButton from "../components/FavoriteButton";
import { ArrowLeft, Users, Landmark, Compass, Coins, Languages, Map, ShieldAlert, Navigation } from "lucide-react";

export default function CountryDetail() {
  const { cca3 } = useParams<{ cca3: string }>();
  const navigate = useNavigate();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    if (!cca3) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCountryByCca3(cca3);
      setCountry(data);
    } catch (e) {
      const err = e as Error;
      setError(err.message || "Tafsilotlarni yuklashda xatolik.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [cca3]);

  if (loading) {
    return (
      <div className="py-12">
        <Loading />
      </div>
    );
  }

  if (error || !country) {
    return <ErrorMessage message={error || "Mamlakat topilmadi."} onRetry={loadData} />;
  }

  const {
    name,
    flags,
    coatOfArms,
    population,
    area,
    region,
    subregion,
    capital,
    languages,
    currencies,
    borders,
    maps,
    latlng,
  } = country;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top action row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 shadow-2xs transition-all cursor-pointer outline-none"
        >
          <ArrowLeft size={16} /> Ortga qaytish
        </button>

        <FavoriteButton cca3={country.cca3} size={20} showText={true} />
      </div>

      {/* Detail Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Aspect: Flag and Coat of Arms */}
        <div className="lg:col-span-5 space-y-6">
          <div className="overflow-hidden rounded-3xl border border-zinc-200/50 dark:border-zinc-800/80 bg-white dark:bg-zinc-900 shadow-xs p-3">
            <img
              src={flags.svg || flags.png}
              alt={flags.alt || `${name.common} bayrog'i`}
              referrerPolicy="no-referrer"
              className="w-full rounded-2xl object-cover aspect-[3/2]"
            />
          </div>

          {/* Optional Emblem */}
          {coatOfArms && (coatOfArms.svg || coatOfArms.png) && (
            <div className="bg-zinc-50/50 dark:bg-zinc-900/10 p-5 rounded-2xl border border-zinc-150 dark:border-zinc-805 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                  Davlat Emblemasi
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 font-sans">
                  Milliy gerb yoki rasmiy timsol
                </p>
              </div>
              <img
                src={coatOfArms.svg || coatOfArms.png}
                alt={`${name.common} gerbi`}
                referrerPolicy="no-referrer"
                className="w-16 h-16 object-contain"
                loading="lazy"
              />
            </div>
          )}
        </div>

        {/* Right Details Stats Panels */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] font-black font-mono tracking-widest text-indigo-500 dark:text-indigo-400 uppercase">
              {region} {subregion ? `→ ${subregion}` : ""}
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight leading-none">
              {name.common}
            </h1>
            {name.official && name.official !== name.common && (
              <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-500 font-mono tracking-wide leading-relaxed">
                {name.official}
              </p>
            )}
          </div>

          {/* Informational grid stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon={<Users size={18} />}
              label="Aholi soni"
              value={formatPopulation(population)}
              subValue="Taqdim etilgan umumiy soni"
            />
            <StatCard
              icon={<Map size={18} />}
              label="Maydoni"
              value={formatArea(area)}
              subValue="Yer yuzasi ko'rsatkichi"
            />
            <StatCard
              icon={<Landmark size={18} />}
              label="Poytaxt"
              value={listCapitals(capital)}
              subValue="Siyosiy ma'muriyat shahri"
            />
            <StatCard
              icon={<Languages size={18} />}
              label="Muloqot tillari"
              value={listLanguages(languages)}
              subValue="Mamlakatda so'zlashiladigan tillar"
            />
            <StatCard
              icon={<Coins size={18} />}
              label="Pul birligi"
              value={listCurrencies(currencies)}
              subValue="Milliy valyuta belgisi"
            />
            <StatCard
              icon={<Compass size={18} />}
              label="Koordinatalari"
              value={latlng ? `${latlng[0].toFixed(2)}°, ${latlng[1].toFixed(2)}°` : "Noma'lum"}
              subValue="Geografik koordinata joylashuvi"
            />
          </div>

          {/* Borders display lists */}
          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              CHEGARADOSH QO'SHNI DAVLATLAR ({borders?.length || 0} TA)
            </span>
            {borders && borders.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1 border-opacity-40">
                {borders.map((borderCode) => (
                  <BorderCountry key={borderCode} cca3={borderCode} />
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-4 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/10 border border-zinc-100 dark:border-zinc-800/80 max-w-lg">
                <ShieldAlert size={16} className="text-zinc-400 shrink-0" />
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                  Ushbu mamlakat boshqa davlatlar bilan chegaradosh emas (masalan orol-davlatlar).
                </span>
              </div>
            )}
          </div>

          {/* Maps references link icons */}
          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
            <span className="text-[10px] font-bold font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              GEOGRAFIK INTERAKTIV XARITALARI
            </span>
            <div className="flex flex-wrap gap-3">
              {maps?.googleMaps && (
                <a
                  href={maps.googleMaps}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-emerald-50 dark:bg-emerald-950/25 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/45 hover:bg-emerald-100/50 dark:hover:bg-emerald-950/40 transition-all cursor-pointer"
                >
                  <Navigation size={14} /> Google Maps
                </a>
              )}
              {maps?.openStreetMaps && (
                <a
                  href={maps.openStreetMaps}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-orange-50 dark:bg-orange-950/25 text-orange-600 dark:text-orange-400 border border-orange-100/50 dark:border-orange-900/45 hover:bg-orange-100/50 dark:hover:bg-orange-950/40 transition-all cursor-pointer"
                >
                  <Map size={14} /> OpenStreetMap
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
