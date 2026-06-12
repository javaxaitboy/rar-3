import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY = "worldexplorer_favorites";

interface FavoritesContextType {
  favorites: string[];
  isFavorite: (cca3: string) => boolean;
  toggleFavorite: (cca3: string) => void;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Error reading favorites from localStorage:", e);
      return [];
    }
  });

  const lastWrittenValue = useRef<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stringified = JSON.stringify(favorites);
      lastWrittenValue.current = stringified;
      localStorage.setItem(STORAGE_KEY, stringified);
    } catch (e) {
      console.error("Error writing favorites to localStorage:", e);
    }
  }, [favorites]);

  // Support multi-tab updates (the storage event only fires for changes made in other tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        // Skip updates initiated by the same session to avoid circular triggering
        if (e.newValue === lastWrittenValue.current) {
          return;
        }
        try {
          const stored = e.newValue || localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            setFavorites((prev) => {
              if (prev.length === parsed.length && prev.every((v, i) => v === parsed[i])) {
                return prev;
              }
              return parsed;
            });
          }
        } catch (e) {
          console.error("Error sync reading favorites:", e);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const isFavorite = useCallback(
    (cca3: string) => {
      return favorites.includes(cca3.toUpperCase());
    },
    [favorites]
  );

  const toggleFavorite = useCallback(
    (cca3: string) => {
      const code = cca3.toUpperCase();
      setFavorites((prev) => {
        if (prev.includes(code)) {
          return prev.filter((c) => c !== code);
        } else {
          return [...prev, code];
        }
      });
    },
    []
  );

  return React.createElement(
    FavoritesContext.Provider,
    { value: { favorites, isFavorite, toggleFavorite } },
    children
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
