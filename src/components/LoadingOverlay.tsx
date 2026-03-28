import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
  loadingStep: string;
}

export function LoadingOverlay({ isLoading, loadingStep }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md"
        >
          <div className="bg-zinc-900/80 p-8 rounded-3xl border border-white/10 flex flex-col items-center max-w-sm w-full mx-4 shadow-2xl">
            <Loader2 className="w-12 h-12 text-emerald-400 animate-spin mb-6" />
            <h3 className="text-xl font-semibold text-white mb-2 text-center">Pracuji na tom...</h3>
            <p className="text-zinc-400 text-center text-sm animate-pulse">{loadingStep}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
