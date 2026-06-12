import { motion } from "motion/react";

export default function Loading() {
  return (
    <div id="loading-container" className="flex flex-col items-center justify-center min-h-[300px] w-full py-16">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="w-12 h-12 rounded-full border-4 border-indigo-100 dark:border-indigo-950/40 border-t-indigo-600"
        />
        <div className="absolute w-4 h-4 rounded-full bg-indigo-500 animate-ping" />
      </div>
      <p className="mt-4 text-sm font-medium text-zinc-500 dark:text-zinc-400 animate-pulse font-mono tracking-wider">
        MA'LUMOTLAR YUKLANMOQDA...
      </p>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden h-full flex flex-col animate-pulse">
      <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800" />
      <div className="p-5 flex-1 flex flex-col">
        <div className="w-1/3 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-2" />
        <div className="w-3/4 h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md mb-4" />
        
        <div className="space-y-2 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <div className="flex justify-between items-center">
            <div className="w-1/4 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
            <div className="w-1/3 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-1/4 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
            <div className="w-2/5 h-3 bg-zinc-200 dark:bg-zinc-800 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
