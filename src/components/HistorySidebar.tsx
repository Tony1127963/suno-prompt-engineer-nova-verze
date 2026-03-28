import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Filter, Calendar, ListOrdered, Copy } from 'lucide-react';
import { HistoryItem, GenerationMode, GenerationResult } from '../types';

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filteredHistory: HistoryItem[];
  onDelete: (id: string) => void;
  onClear: () => void;
  historySearch: string;
  setHistorySearch: (search: string) => void;
  historyFilterMode: 'all' | GenerationMode;
  setHistoryFilterMode: (mode: 'all' | GenerationMode) => void;
  historySortOrder: 'newest' | 'oldest';
  setHistorySortOrder: (order: 'newest' | 'oldest') => void;
  onUseHistoryItem: (item: HistoryItem) => void;
  onCopy: (text: string, type: string) => void;
}

export function HistorySidebar({
  isOpen,
  onClose,
  filteredHistory,
  onDelete,
  onClear,
  historySearch,
  setHistorySearch,
  historyFilterMode,
  setHistoryFilterMode,
  historySortOrder,
  setHistorySortOrder,
  onUseHistoryItem,
  onCopy
}: HistorySidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-40 will-change-opacity"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#1c1c1e] border-l border-white/10 z-50 flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-bottom border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <ListOrdered className="w-6 h-6 theme-primary-text" />
                <h2 className="text-xl font-bold text-white tracking-tight">Historie</h2>
              </div>
              <button 
                onClick={onClose} 
                className="p-2 bg-white/5 rounded-full text-zinc-400 hover:text-white transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="px-4 pb-4 space-y-3 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Hledat v historii..."
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Filter className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                  <select
                    value={historyFilterMode}
                    onChange={(e) => setHistoryFilterMode(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
                  >
                    <option value="all">Všechny režimy</option>
                    <option value="generate">Generování</option>
                    <option value="refine">Vylepšení</option>
                  </select>
                </div>
                <div className="relative flex-1">
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500 pointer-events-none" />
                  <select
                    value={historySortOrder}
                    onChange={(e) => setHistorySortOrder(e.target.value as any)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-white/20 appearance-none cursor-pointer"
                  >
                    <option value="newest">Od nejnovějších</option>
                    <option value="oldest">Od nejstarších</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
              {filteredHistory.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 space-y-4 opacity-50">
                  <Search className="w-12 h-12" />
                  <p>{history.length === 0 ? 'Zatím žádná historie' : 'Žádné výsledky hledání'}</p>
                </div>
              ) : (
                filteredHistory.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-3 hover:bg-white/[0.08] transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${item.mode === 'generate' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                            {item.mode === 'generate' ? 'Generování' : 'Vylepšení'}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-mono">
                            {new Date(item.timestamp).toLocaleString('cs-CZ')}
                          </span>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-200 line-clamp-1">{item.result.title}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                        className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-zinc-500 line-clamp-2 italic">"{item.prompt}"</p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => onUseHistoryItem(item)}
                        className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-medium transition-all active:scale-95"
                      >
                        Použít znovu
                      </button>
                      <button
                        onClick={() => {
                          onCopy(`TITLE:\n${item.result.title}\n\nSTYLE:\n${item.result.styleBox}\n\nLYRICS:\n${item.result.lyricsBox}`, 'all');
                        }}
                        className="p-2 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all active:scale-95"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {filteredHistory.length > 0 && (
              <div className="p-4 border-t border-white/5">
                <button
                  onClick={() => {
                    if (confirm('Opravdu chcete smazat celou historii?')) {
                      onClear();
                    }
                  }}
                  className="w-full py-3 text-zinc-500 hover:text-red-400 text-sm font-medium transition-colors"
                >
                  Smazat vše
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
