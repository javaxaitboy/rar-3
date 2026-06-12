import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Country } from "../types";
import { formatPopulation, listCapitals } from "../utils/formatters";
import FavoriteButton from "./FavoriteButton";
import { Users, Landmark } from "lucide-react";

interface CountryCardProps {
  country: Country;
  key?: React.Key;
}

export default function CountryCard({ country }: CountryCardProps) {
  const { cca3, flags, name, population, region, capital } = country;

  return (
    <motion.div
      layout
      id={`country-card-${cca3.toLowerCase()}`}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all overflow-hidden"
    >
      {/* Flag Frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-850">
        <Link to={`/country/${cca3.toLowerCase()}`} className="block w-full h-full cursor-pointer">
          <img
            src={flags.png}
            alt={flags.alt || `${name.common} bayrog'i`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        {/* Absolute Favorite button */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton cca3={cca3} />
        </div>
      </div>

      {/* Card Content info */}
      <div className="flex-1 p-5 flex flex-col justify-between">
        <div>
          <Link to={`/country/${cca3.toLowerCase()}`} className="block cursor-pointer">
            <h3 className="text-lg font-black text-zinc-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 leading-tight tracking-tight">
              {name.common}
            </h3>
          </Link>
          <p className="text-xs text-zinc-400 dark:text-zinc-550 font-bold tracking-wide uppercase mt-1 mb-4">
            {region} &bull; {listCapitals(capital)}
          </p>
        </div>

        {/* Dynamic Detail stats & Population Visual Bar */}
        <div className="space-y-3.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/60">
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-extrabold font-mono">
              <span className="flex items-center gap-1">
                <Users size={12} /> Aholi soni
              </span>
              <span className="text-zinc-950 dark:text-zinc-200 font-semibold">{formatPopulation(population)}</span>
            </div>
            <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(5, Math.min(100, (population / 350000000) * 100))}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
