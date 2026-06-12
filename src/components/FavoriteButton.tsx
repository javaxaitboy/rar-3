import React from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";

interface FavoriteButtonProps {
  cca3: string;
  size?: number;
  showText?: boolean;
}

export default function FavoriteButton({ cca3, size = 18, showText = false }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(cca3);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(cca3);
  };

  return (
    <motion.button
      id={`fav-btn-${cca3.toLowerCase()}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`relative flex items-center justify-center gap-1.5 rounded-xl cursor-pointer transition-all border outline-none ${
        active
          ? "bg-rose-50/90 text-rose-600 border-rose-200/80 shadow-xs"
          : "bg-white/80 dark:bg-zinc-800/80 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 border-zinc-200/60 dark:border-zinc-700/60 shadow-xs hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
      } ${showText ? "px-4 py-2" : "p-2"}`}
      aria-label={active ? "Sevimli asarlar ro'yxatidan o'chirish" : "Sevimliga qo'shish"}
    >
      <Heart
        size={size}
        className={`transition-colors duration-300 ${active ? "fill-rose-500 stroke-rose-500 animate-pulse" : "stroke-current"}`}
      />
      {showText && (
        <span className="text-sm font-medium">
          {active ? "Saralangan" : "Saralanganlarga qo'shish"}
        </span>
      )}
    </motion.button>
  );
}
