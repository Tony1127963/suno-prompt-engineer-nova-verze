import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Palette, SlidersHorizontal, Type } from 'lucide-react';
import { Theme, THEMES } from '../constants';

interface ThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeModal = memo(({
  isOpen,
  onClose,
  theme,
  setTheme
}: ThemeModalProps) => {
  if (!isOpen) return null;

  const updateTheme = (updates: Partial<Theme>) => {
    setTheme({ ...theme, ...updates, id: 'custom', name: 'Custom' });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl theme-glass border border-white/10 shadow-2xl overflow-hidden rounded-[calc(var(--radius)*1.2)] backdrop-blur-2xl"
        >
          <div className="p-6 md:p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 theme-primary-bg rounded-[var(--radius)] shadow-lg shadow-[color-mix(in_srgb,var(--primary)_20%,transparent)]">
                  <Palette className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight">Vzhled a motivy</h2>
                  <p className="text-zinc-500 text-sm">Přizpůsobte si rozhraní aplikace</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-[var(--radius)] transition-colors text-zinc-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="grid gap-10">
              {/* Theme Presets */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Předvolby</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {THEMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t)}
                      className={`p-4 rounded-[var(--radius)] border transition-all duration-300 flex items-center gap-3 ${
                        theme.id === t.id 
                        ? 'border-[var(--primary)] bg-white/10 shadow-lg shadow-[color-mix(in_srgb,var(--primary)_10%,transparent)]' 
                        : 'border-white/5 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div 
                        className="w-4 h-4 rounded-full shadow-inner"
                        style={{ backgroundColor: t.primary }}
                      />
                      <span className="text-sm font-medium text-zinc-300">{t.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* Color Customization */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Barvy</h3>
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-4">Hlavní barva</h4>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[var(--radius)] border border-white/5">
                      <input 
                        type="color" 
                        value={theme.primary}
                        onChange={(e) => updateTheme({ primary: e.target.value })}
                        className="w-12 h-12 rounded-lg bg-transparent cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-zinc-500 mb-1">HEX kód</p>
                        <input 
                          type="text" 
                          value={theme.primary}
                          onChange={(e) => updateTheme({ primary: e.target.value })}
                          className="bg-transparent text-white font-mono text-sm w-full outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-4">Barva pozadí</h4>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[var(--radius)] border border-white/5">
                      <input 
                        type="color" 
                        value={theme.background}
                        onChange={(e) => updateTheme({ background: e.target.value })}
                        className="w-12 h-12 rounded-lg bg-transparent cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-zinc-500 mb-1">HEX kód</p>
                        <input 
                          type="text" 
                          value={theme.background}
                          onChange={(e) => updateTheme({ background: e.target.value })}
                          className="bg-transparent text-white font-mono text-sm w-full outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-zinc-300 mb-4">Barva skla (panelů)</h4>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-[var(--radius)] border border-white/5">
                      <input 
                        type="color" 
                        value={theme.glassColor || '#18181b'}
                        onChange={(e) => updateTheme({ glassColor: e.target.value })}
                        className="w-12 h-12 rounded-lg bg-transparent cursor-pointer"
                      />
                      <div className="flex-1">
                        <p className="text-xs text-zinc-500 mb-1">HEX kód</p>
                        <input 
                          type="text" 
                          value={theme.glassColor || '#18181b'}
                          onChange={(e) => updateTheme({ glassColor: e.target.value })}
                          className="bg-transparent text-white font-mono text-sm w-full outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Effects and Shapes */}
              <section>
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Efekty a tvary</h3>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Zaoblení rohů</label>
                      <span className="text-xs font-mono text-zinc-500">{theme.radius}rem</span>
                    </div>
                    <input 
                      type="range" min="0" max="3" step="0.25"
                      value={theme.radius}
                      onChange={(e) => updateTheme({ radius: e.target.value })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Glow efekt</label>
                      <span className="text-xs font-mono text-zinc-500">{Math.round(theme.glow * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.05"
                      value={theme.glow}
                      onChange={(e) => updateTheme({ glow: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                </div>
              </section>

              {/* Panel Settings */}
              <section>
                <div className="flex items-center gap-2 mb-6 text-zinc-400">
                  <SlidersHorizontal className="w-4 h-4" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Nastavení panelů</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Průhlednost skla</label>
                      <span className="text-xs font-mono text-zinc-500">{Math.round(theme.glassOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.05"
                      value={theme.glassOpacity}
                      onChange={(e) => updateTheme({ glassOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Rozmazání pozadí</label>
                      <span className="text-xs font-mono text-zinc-500">{theme.blur}px</span>
                    </div>
                    <input 
                      type="range" min="0" max="64" step="1"
                      value={theme.blur}
                      onChange={(e) => updateTheme({ blur: parseInt(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Průhlednost panelů</label>
                      <span className="text-xs font-mono text-zinc-500">{Math.round(theme.panelOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="0.3" step="0.01"
                      value={theme.panelOpacity}
                      onChange={(e) => updateTheme({ panelOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Rozmazání panelů</label>
                      <span className="text-xs font-mono text-zinc-500">{theme.panelBlur}px</span>
                    </div>
                    <input 
                      type="range" min="0" max="40" step="1"
                      value={theme.panelBlur}
                      onChange={(e) => updateTheme({ panelBlur: parseInt(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Průhlednost okrajů</label>
                      <span className="text-xs font-mono text-zinc-500">{Math.round(theme.borderOpacity * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="0.5" step="0.01"
                      value={theme.borderOpacity}
                      onChange={(e) => updateTheme({ borderOpacity: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <label className="text-sm text-zinc-300">Intenzita stínů</label>
                      <span className="text-xs font-mono text-zinc-500">{Math.round(theme.shadowIntensity * 100)}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="1" step="0.05"
                      value={theme.shadowIntensity}
                      onChange={(e) => updateTheme({ shadowIntensity: parseFloat(e.target.value) })}
                      className="w-full accent-[var(--primary)]"
                    />
                  </div>
                </div>
              </section>

              {/* Font Family */}
              <section>
                <div className="flex items-center gap-2 mb-6 text-zinc-400">
                  <Type className="w-4 h-4" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider">Písmo (Font)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateTheme({ fontFamily: 'sans' })}
                    className={`p-4 rounded-[var(--radius)] border transition-all duration-300 flex flex-col items-center gap-2 ${
                      theme.fontFamily === 'sans' 
                      ? 'border-[var(--primary)] bg-white/10' 
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl font-bold font-sans">Aa</span>
                    <span className="text-xs font-medium text-zinc-300">Sans Serif</span>
                  </button>
                  <button
                    onClick={() => updateTheme({ fontFamily: 'mono' })}
                    className={`p-4 rounded-[var(--radius)] border transition-all duration-300 flex flex-col items-center gap-2 ${
                      theme.fontFamily === 'mono' 
                      ? 'border-[var(--primary)] bg-white/10' 
                      : 'border-white/5 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-2xl font-bold font-mono">Aa</span>
                    <span className="text-xs font-medium text-zinc-300">Monospace</span>
                  </button>
                </div>
              </section>
            </div>
          </div>
          <div className="p-6 bg-zinc-900/50 border-t border-white/5 flex justify-end">
            <button
              onClick={onClose}
              className="py-3 px-8 theme-primary-bg text-white rounded-[var(--radius)] font-bold transition-all duration-300 hover:brightness-110 shadow-lg shadow-[color-mix(in_srgb,var(--primary)_20%,transparent)] active:scale-95"
            >
              Hotovo
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
