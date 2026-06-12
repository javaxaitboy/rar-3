import { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import CountryDetail from "./pages/CountryDetail";
import Favorites from "./pages/Favorites";
import { Compass, Heart, Sun, Moon, Globe2 } from "lucide-react";
import { useFavorites, FavoritesProvider } from "./hooks/useFavorites";

export default function App() {
  return (
    <FavoritesProvider>
      <AppContent />
    </FavoritesProvider>
  );
}

function AppContent() {
  const { favorites } = useFavorites();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("worldexplorer_theme");
      if (saved) return saved === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("worldexplorer_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("worldexplorer_theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
        
        {/* Sticky Header Nav with Blur */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/85 backdrop-blur-md border-b border-zinc-150/80 dark:border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 text-zinc-950 dark:text-white hover:opacity-90 transition-opacity cursor-pointer">
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm tracking-tight shadow-sm shrink-0">
                W
              </div>
              <div>
                <span className="font-black text-base tracking-tighter block uppercase leading-none">
                  World<span className="text-indigo-650 dark:text-indigo-400">Explorer</span>
                </span>
                <span className="text-[8px] font-black font-mono tracking-widest text-zinc-400 dark:text-zinc-500 uppercase leading-none block mt-1">
                  PLATFORMA &bull; v1.0
                </span>
              </div>
            </Link>

            {/* Actions / Menu */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer outline-none"
                aria-label="Rang mavzusi"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {/* Navigation Items */}
              <nav className="flex items-center gap-1.5 sm:gap-2">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 sm:px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer outline-none ${
                      isActive
                        ? "bg-indigo-50/90 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-900/50 dark:text-indigo-400"
                        : "bg-white border-zinc-200/80 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-650 dark:text-zinc-350"
                    }`
                  }
                >
                  <span className="flex items-center gap-1.5">
                    <Compass size={14} />
                    Asosiy
                  </span>
                </NavLink>

                <NavLink
                  to="/favorites"
                  className={({ isActive }) =>
                    `px-3 sm:px-4 py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer outline-none ${
                      isActive
                        ? "bg-rose-50/90 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900/50 dark:text-rose-400"
                        : "bg-white border-zinc-200/80 hover:border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800 dark:hover:border-zinc-700 text-zinc-650 dark:text-zinc-350"
                    }`
                  }
                >
                  <span className="flex items-center gap-1.5 relative">
                    <Heart size={14} className={favorites.length > 0 ? "fill-rose-500 text-rose-500" : ""} />
                    Saralanganlar
                    {favorites.length > 0 && (
                      <span className="absolute -top-3 -right-2 px-1.5 py-0.5 text-[8px] font-black font-mono text-white bg-rose-500 rounded-full leading-none animate-pulse">
                        {favorites.length}
                      </span>
                    )}
                  </span>
                </NavLink>
              </nav>
            </div>
          </div>
        </header>

        {/* Page Container Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:cca3" element={<CountryDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Global Footer Status Bar */}
        <footer className="border-t border-zinc-150 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 py-5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider text-zinc-550 dark:text-zinc-400">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse inline-block" />
              API HOLATI: REST COUNTRIES V3.1 FAOLLASHTIRILGAN
            </div>
            <div className="flex gap-4 text-[10px] font-bold font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              <span>Next.js 15 App Router</span>
              <span>&bull;</span>
              <span>v1.0.0 STABLE</span>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
