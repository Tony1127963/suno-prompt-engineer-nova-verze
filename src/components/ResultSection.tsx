import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Copy, Check, ListOrdered, ExternalLink, X } from 'lucide-react';

interface ResultSectionProps {
  result: {
    title: string;
    styleBox: string;
    lyricsBox: string;
  };
  copyToClipboard: (text: string, type: 'title' | 'style' | 'lyrics' | 'all') => void;
  copiedTitle: boolean;
  copiedStyle: boolean;
  copiedLyrics: boolean;
  copiedAll: boolean;
  onReset: () => void;
}

export const ResultSection = memo(({ 
  result, 
  copyToClipboard, 
  copiedTitle, 
  copiedStyle, 
  copiedLyrics, 
  copiedAll,
  onReset
}: ResultSectionProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: {
            type: 'spring',
            damping: 25,
            stiffness: 200,
            staggerChildren: 0.1
          }
        },
        exit: { opacity: 0, y: -20, scale: 0.98 }
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6 will-change-transform transform-gpu"
    >
      {/* Title Box */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        className="md:col-span-12 theme-glass border border-white/5 p-4 md:p-6 shadow-2xl transition-colors duration-500 flex items-center justify-between rounded-2xl backdrop-blur-xl"
      >
        <div>
          <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-0.5">Song Title</h3>
          <h2 className="text-xl md:text-2xl font-bold text-white">{result.title}</h2>
        </div>
        <motion.button
          onClick={() => copyToClipboard(result.title, 'title')}
          whileTap={{ scale: 0.9 }}
          className="p-2.5 hover:bg-white/10 theme-glass-inner transition-colors text-zinc-400 hover:text-zinc-100 bg-black/20 border border-white/5 rounded-xl relative overflow-hidden"
          title="Copy Title"
        >
          <AnimatePresence mode="wait">
            {copiedTitle ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="transform-gpu will-change-transform"
              >
                <Check className="w-5 h-5 text-emerald-400" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className="transform-gpu will-change-transform"
              >
                <Copy className="w-5 h-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Style Box */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        className="theme-glass border border-white/5 p-4 md:p-6 shadow-2xl transition-all duration-500 h-fit rounded-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Style of Music</h3>
          <motion.button
            onClick={() => copyToClipboard(result.styleBox, 'style')}
            whileTap={{ scale: 0.9 }}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100 relative"
            title="Copy Style"
          >
            <AnimatePresence mode="wait">
              {copiedStyle ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  className="transform-gpu will-change-transform"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="transform-gpu will-change-transform"
                >
                  <Copy className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
        <div className="bg-zinc-950/50 border border-white/5 theme-glass-inner p-3 md:p-4 transition-all duration-500 rounded-xl">
          <p className="text-zinc-200 font-mono text-[13px] md:text-sm leading-relaxed">
            {result.styleBox}
          </p>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] text-zinc-500">
          <span>Max 1000 chars</span>
          <span className={result.styleBox.length > 1000 ? 'text-red-400' : 'text-emerald-400'}>
            {result.styleBox.length}/1000
          </span>
        </div>
      </motion.div>

      {/* Lyrics Box */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        className="theme-glass border border-white/5 p-4 md:p-6 shadow-2xl transition-all duration-500 rounded-2xl backdrop-blur-xl"
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider">Lyrics</h3>
          <button
            onClick={() => copyToClipboard(result.lyricsBox, 'lyrics')}
            className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-zinc-100 relative"
            title="Copy Lyrics"
          >
            <AnimatePresence mode="wait">
              {copiedLyrics ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                  className="transform-gpu will-change-transform"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="transform-gpu will-change-transform"
                >
                  <Copy className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
        <div className="bg-zinc-950/50 border border-white/5 theme-glass-inner p-4 md:p-6 overflow-x-auto transition-all duration-500 rounded-xl">
          <pre className="text-zinc-200 font-mono text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap">
            {result.lyricsBox}
          </pre>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div 
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        className="flex flex-col sm:flex-row gap-3 mt-1"
      >
        <button
          onClick={() => copyToClipboard(`TITLE:\n${result.title}\n\nSTYLE:\n${result.styleBox}\n\nLYRICS:\n${result.lyricsBox}`, 'all')}
          className="flex-1 py-3.5 px-6 theme-glass-inner flex items-center justify-center gap-2 transition-all duration-500 font-medium bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800 hover:text-white border border-white/5 shadow-lg backdrop-blur-sm rounded-2xl text-[15px] active:scale-[0.98]"
        >
          <AnimatePresence mode="wait">
            {copiedAll ? (
              <motion.div
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.5, opacity: 0 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="flex items-center gap-2 transform-gpu will-change-transform"
              >
                <Check className="w-5 h-5 text-emerald-400" />
                <span>Zkopírováno!</span>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-2 transform-gpu will-change-transform"
              >
                <ListOrdered className="w-5 h-5" />
                <span>Kopírovat vše</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <a
          href="https://suno.com/create"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3.5 px-6 theme-glass-inner flex items-center justify-center gap-2 transition-all duration-500 font-medium theme-primary-bg text-white hover:brightness-110 shadow-lg shadow-[color-mix(in_srgb,var(--primary)_20%,transparent)] backdrop-blur-sm rounded-2xl text-[15px] active:scale-[0.98]"
        >
          <ExternalLink className="w-5 h-5" />
          Otevřít Suno
        </a>
      </motion.div>

      <motion.button
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 }
        }}
        onClick={onReset}
        className="w-full py-4 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-200 rounded-[var(--radius)] transition-all duration-300 text-[15px] font-medium flex items-center justify-center gap-2 border border-white/5"
      >
        <X className="w-4 h-4" />
        Vytvořit novou píseň
      </motion.button>
    </motion.div>
  );
});
