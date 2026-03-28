import { useState, useMemo, useCallback } from 'react';
import { HistoryItem } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useHistory() {
  const [history, setHistory] = useLocalStorage<HistoryItem[]>('suno-history', []);
  const [historySearch, setHistorySearch] = useState('');
  const [historyFilterMode, setHistoryFilterMode] = useState<'all' | 'generate' | 'refine'>('all');
  const [historySortOrder, setHistorySortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredHistory = useMemo(() => {
    return history
      .filter(item => {
        const searchLower = historySearch.toLowerCase();
        const matchesSearch = 
          item.prompt.toLowerCase().includes(searchLower) || 
          item.result.title.toLowerCase().includes(searchLower) ||
          (item.userLyrics && item.userLyrics.toLowerCase().includes(searchLower));
        const matchesMode = historyFilterMode === 'all' || item.mode === historyFilterMode;
        return matchesSearch && matchesMode;
      })
      .sort((a, b) => {
        return historySortOrder === 'newest' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
      });
  }, [history, historySearch, historyFilterMode, historySortOrder]);

  const addToHistory = useCallback((item: HistoryItem) => {
    setHistory(prev => [item, ...prev].slice(0, 50)); // Keep last 50
  }, [setHistory]);

  const deleteHistoryItem = useCallback((id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
    localStorage.removeItem(`suno-art-${id}`);
  }, [setHistory]);

  const clearHistory = useCallback(() => {
    history.forEach(item => {
      localStorage.removeItem(`suno-art-${item.id}`);
    });
    setHistory([]);
  }, [history, setHistory]);

  return {
    history,
    filteredHistory,
    historySearch,
    setHistorySearch,
    historyFilterMode,
    setHistoryFilterMode,
    historySortOrder,
    setHistorySortOrder,
    addToHistory,
    deleteHistoryItem,
    clearHistory
  };
}
