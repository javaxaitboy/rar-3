import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCountryByCca3 } from "../lib/api";

interface BorderCountryProps {
  cca3: string;
  key?: React.Key;
}

export default function BorderCountry({ cca3 }: BorderCountryProps) {
  const [name, setName] = useState<string>(cca3);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    
    fetchCountryByCca3(cca3)
      .then((country) => {
        if (active) {
          setName(country.name.common);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(`Error loading border name for ${cca3}:`, error);
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [cca3]);

  return (
    <Link
      to={`/country/${cca3.toLowerCase()}`}
      className={`inline-flex items-center justify-center px-3.5 py-2 text-xs font-bold rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/80 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-2xs transition-all translate-y-0 hover:-translate-y-0.5 whitespace-nowrap cursor-pointer ${
        loading ? "opacity-72 animate-pulse bg-zinc-50 dark:bg-zinc-850" : ""
      }`}
    >
      <span className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-650 group-hover:bg-indigo-500" />
        {name}
      </span>
    </Link>
  );
}
