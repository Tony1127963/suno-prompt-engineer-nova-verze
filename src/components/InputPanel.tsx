import { motion, AnimatePresence } from 'motion/react';
import { Mic, Music, Wand2, AlignLeft, Sparkles, Loader2, Settings2, Mic2, ChevronRight } from 'lucide-react';
import { GenerationMode } from '../types';

interface InputPanelProps {
  prompt: string;
  setPrompt: (value: string) => void;
  isInstrumental: boolean;
  setIsInstrumental: (value: boolean) => void;
  mode: GenerationMode;
  setMode: (mode: GenerationMode) => void;
  isAutoMode: boolean;
  setIsAutoMode: (value: boolean) => void;
  isLoading: boolean;
  loadingStep: string;
  onGenerate: () => void;
  hasResult: boolean;
  onOpenSettings: () => void;
  userLyrics: string;
  setUserLyrics: (value: string) => void;
}

export function InputPanel({
  prompt,
  setPrompt,
  isInstrumental,
  setIsInstrumental,
  mode,
  setMode,
  isAutoMode,
  setIsAutoMode,
  isLoading,
  loadingStep,
  onGenerate,
  hasResult,
  onOpenSettings,
  userLyrics,
  setUserLyrics
}: InputPanelProps) {
  return (
    <div className="theme-glass border border-white/5 p-5 md:p-8 shadow-2xl transition-colors duration-500 rounded-[2.5rem] md:rounded-[var(--radius)]">
      <div className="flex flex-col sm:flex-row gap-4 mb-6 md:mb-8">
        <motion.div
          className="ios-segmented flex-1 relative bg-black/20 p-1.5 rounded-2xl flex touch-pan-y select-none"
          onPanEnd={(e, info) => {
            const threshold = 20;
            if (info.offset.x > threshold && !isInstrumental) {
              setIsInstrumental(true);
            } else if (info.offset.x < -threshold && isInstrumental) {
              setIsInstrumental(false);
            }
          }}
        >
          <button
            onClick={() => setIsInstrumental(false)}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold min-h-[44px] ios-segmented-item ${!isInstrumental ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {!isInstrumental && (
              <motion.div
                layoutId="segmented-active"
                className="ios-segmented-active will-change-transform transform-gpu"
                transition={{ type: 'spring', bounce: 0.15, stiffness: 400, damping: 30 }}
              />
            )}
            <Mic className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Se zpěvem</span>
          </button>
          <button
            onClick={() => setIsInstrumental(true)}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold min-h-[44px] ios-segmented-item ${isInstrumental ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {isInstrumental && (
              <motion.div
                layoutId="segmented-active"
                className="ios-segmented-active will-change-transform transform-gpu"
                transition={{ type: 'spring', bounce: 0.15, stiffness: 400, damping: 30 }}
              />
            )}
            <Music className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Instrumental</span>
          </button>
        </motion.div>

        <motion.div
          className="ios-segmented flex-1 relative bg-black/20 p-1.5 rounded-2xl flex touch-pan-y select-none"
          onPanEnd={(e, info) => {
            const threshold = 20;
            if (info.offset.x > threshold && mode === 'generate') {
              setMode('refine');
            } else if (info.offset.x < -threshold && mode === 'refine') {
              setMode('generate');
            }
          }}
        >
          <button
            onClick={() => setMode('generate')}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold min-h-[44px] ios-segmented-item ${mode === 'generate' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {mode === 'generate' && (
              <motion.div
                layoutId="mode-segmented-active"
                className="ios-segmented-active will-change-transform transform-gpu"
                transition={{ type: 'spring', bounce: 0.15, stiffness: 400, damping: 30 }}
              />
            )}
            <Wand2 className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Generovat</span>
          </button>
          <button
            onClick={() => setMode('refine')}
            className={`flex-1 py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold min-h-[44px] ios-segmented-item ${mode === 'refine' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
          >
            {mode === 'refine' && (
              <motion.div
                layoutId="mode-segmented-active"
                className="ios-segmented-active will-change-transform transform-gpu"
                transition={{ type: 'spring', bounce: 0.15, stiffness: 400, damping: 30 }}
              />
            )}
            <AlignLeft className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Vylepšit</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {mode === 'refine' && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <label htmlFor="userLyrics" className="block text-[15px] font-medium text-zinc-400 mb-3 flex items-center gap-2 px-1">
              <AlignLeft className="w-4 h-4 theme-primary-text transition-colors duration-500" />
              Vložte svůj text k vylepšení
            </label>
            <textarea
              id="userLyrics"
              value={userLyrics}
              onChange={(e) => setUserLyrics(e.target.value)}
              placeholder="Vložte sem své texty, které chcete vylepšit o Suno tagy..."
              className="w-full h-48 bg-black/30 border border-white/10 theme-glass-inner p-5 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_50%,transparent)] focus:border-[color-mix(in_srgb,var(--primary)_50%,transparent)] transition-colors duration-500 resize-none text-[17px] shadow-inner leading-relaxed"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <label htmlFor="prompt" className="block text-[15px] font-medium text-zinc-400 mb-3 flex items-center gap-2 px-1">
        <Mic2 className="w-4 h-4 theme-primary-text transition-colors duration-500" />
        {mode === 'generate' ? 'Popište svou představu o písničce' : 'Popište styl a náladu vylepšení'}
      </label>
      <textarea
        id="prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={isInstrumental ? "např. Epický orchestrální soundtrack pro sci-fi bitvu..." : "např. Písnička ve stylu Queen o pečení dortu..."}
        className="w-full h-32 md:h-40 bg-black/30 border border-white/10 theme-glass-inner p-5 text-zinc-100 placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_50%,transparent)] focus:border-[color-mix(in_srgb,var(--primary)_50%,transparent)] transition-colors duration-500 resize-none text-[17px] shadow-inner leading-relaxed"
      />

      <div className="mt-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl overflow-hidden shadow-sm backdrop-blur-md">
        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/[0.04] transition-colors duration-300 active:bg-white/[0.08] min-h-[56px]"
          onClick={() => setIsAutoMode(!isAutoMode)}
        >
          <div className="flex items-center gap-4">
            <div className={`p-2.5 rounded-xl transition-colors duration-500 ${isAutoMode ? 'bg-[color-mix(in_srgb,var(--primary)_20%,transparent)] theme-primary-text' : 'bg-zinc-800 text-zinc-400'}`}>
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-[17px] font-medium text-zinc-100 tracking-tight">Auto režim</h3>
              <p className="text-[13px] text-zinc-500">AI sama nastaví vše potřebné</p>
            </div>
          </div>
          <motion.button
            layout
            role="switch"
            aria-checked={isAutoMode}
            onClick={(e) => { e.stopPropagation(); setIsAutoMode(!isAutoMode); }}
            className={`relative inline-flex h-[31px] w-[51px] items-center rounded-full transition-colors duration-300 focus:outline-none ${isAutoMode ? 'theme-primary-bg' : 'bg-zinc-700'}`}
          >
            <motion.span
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`inline-block h-[27px] w-[27px] rounded-full bg-white shadow-sm ${isAutoMode ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}
            />
          </motion.button>
        </div>

        <div className="h-[1px] bg-white/[0.05] ml-16" />

        <div
          className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/[0.04] transition-colors duration-300 active:bg-white/[0.08] min-h-[56px]"
          onClick={onOpenSettings}
        >
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 bg-zinc-800 rounded-xl text-zinc-400 transition-colors duration-500"
            >
              <Settings2 className="w-5 h-5" />
            </motion.div>
            <div>
              <h3 className="text-[17px] font-medium text-zinc-100 tracking-tight">Pokročilé nastavení</h3>
              <p className="text-[13px] text-zinc-500">Jazyk, zpěvák, styl mixu...</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-zinc-500" />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-end gap-4">
        <button
          onClick={onGenerate}
          disabled={isLoading || !prompt.trim()}
          className={`w-full inline-flex items-center justify-center theme-primary-bg text-white px-4 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed active:scale-[0.98] active:opacity-80 shadow-lg shadow-[color-mix(in_srgb,var(--primary)_30%,transparent)] h-[60px] relative overflow-hidden group ${!isLoading && !prompt.trim() ? 'opacity-40' : ''}`}
        >
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />

          {isLoading && (
            <motion.div
              className="absolute inset-0 w-[200%] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          )}

          {isLoading ? (
            <div className="relative z-10 flex items-center justify-center gap-3 w-full">
              <Loader2 className="w-5 h-5 animate-spin shrink-0" />
              <span className="text-[14px] leading-tight font-medium text-center whitespace-normal line-clamp-2 drop-shadow-md">
                {loadingStep || 'Pracuji...'}
              </span>
            </div>
          ) : (
            <div className="relative z-10 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 shrink-0" />
              <span className="text-[17px] font-semibold tracking-tight">
                Vygenerovat Prompt
              </span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
