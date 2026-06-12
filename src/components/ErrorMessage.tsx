import { AlertTriangle } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div id="error-container" className="flex flex-col items-center justify-center min-h-[300px] w-full py-16 px-4 text-center">
      <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-4 rounded-2xl mb-4 border border-rose-100 dark:border-rose-900/30">
        <AlertTriangle size={36} className="animate-bounce" />
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">
        Xatolik yuz berdi
      </h3>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mb-6 leading-relaxed font-sans">
        {message || "Kutilmagan xatolik yuz berdi. Iltimos, internet aloqasini tekshiring va qayta urinib ko'ring."}
      </p>
      {onRetry && (
        <button
          id="retry-button"
          onClick={onRetry}
          className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
        >
          Qayta urinish
        </button>
      )}
    </div>
  );
}
