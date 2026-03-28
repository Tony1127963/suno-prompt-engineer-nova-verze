import { Header } from './components/Header';
import { InputPanel } from './components/InputPanel';
import { HistorySidebar } from './components/HistorySidebar';
import { BackgroundEffects } from './components/BackgroundEffects';
import { ResultSection } from './components/ResultSection';
import { SettingsModal } from './components/SettingsModal';
import { ThemeModal } from './components/ThemeModal';

import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { useHistory } from './hooks/useHistory';
import { useGeneration } from './hooks/useGeneration';

import { GenerationMode, HistoryItem } from './types';
import { countSyllables } from './utils/syllableCounter';
import { VocalIntensity, AudioProduction, VocalExtras, VocalGender, StructureType, VocalDensity } from './services/gemini';
import { AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';

declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export default function App() {
  const [prompt, setPrompt] = useLocalStorage<string>('suno-prompt', '');
  const [mode, setMode] = useLocalStorage<GenerationMode>('suno-mode', 'generate');
  const [userLyrics, setUserLyrics] = useLocalStorage<string>('suno-user-lyrics', '');
  const [isInstrumental, setIsInstrumental] = useLocalStorage<boolean>('suno-is-instrumental', false);
  const [vocalIntensity, setVocalIntensity] = useLocalStorage<VocalIntensity>('suno-vocal-intensity', 'auto');
  const [audioProduction, setAudioProduction] = useLocalStorage<AudioProduction>('suno-audio-production', 'auto');
  const [vocalExtras, setVocalExtras] = useLocalStorage<VocalExtras>('suno-vocal-extras', 'auto');
  const [vocalGender, setVocalGender] = useLocalStorage<VocalGender>('suno-vocal-gender', 'auto');
  const [vocalDensity, setVocalDensity] = useLocalStorage<VocalDensity>('suno-vocal-density', 'auto');
  const [languageOverride, setLanguageOverride] = useLocalStorage<string>('suno-language-override', 'auto');
  const [structureType, setStructureType] = useLocalStorage<StructureType>('suno-structure-type', 'auto');
  const [studioGear, setStudioGear] = useLocalStorage<string>('suno-studio-gear', 'auto');
  const [shouldGenerateAlbumArt, setShouldGenerateAlbumArt] = useLocalStorage<boolean>('suno-should-generate-art', true);
  const [isAutoMode, setIsAutoMode] = useLocalStorage<boolean>('suno-auto-mode', true);

  const [showSyllables, setShowSyllables] = useState(true);
  const [copiedTitle, setCopiedTitle] = useState(false);
  const [copiedStyle, setCopiedStyle] = useState(false);
  const [copiedLyrics, setCopiedLyrics] = useState(false);
  const [copiedAll, setCopiedAll] = useState(false);
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const { theme, setTheme, resetToAuto: resetThemeToAuto } = useTheme();
  const { history, filteredHistory, setHistorySearch, historySearch, historyFilterMode, setHistoryFilterMode, historySortOrder, setHistorySortOrder, addToHistory, deleteHistoryItem, clearHistory } = useHistory();
  const { generate, isLoading, loadingStep, error, result, setResult, albumArt, setAlbumArt, appliedSettings, setAppliedSettings } = useGeneration();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    if (mode === 'refine' && !userLyrics.trim()) {
      alert("Pro vylepšení textu musíte zadat původní text.");
      return;
    }

    await generate({
      prompt,
      mode,
      userLyrics,
      isInstrumental,
      isAutoMode,
      vocalIntensity,
      audioProduction,
      vocalExtras,
      vocalGender,
      vocalDensity,
      languageOverride,
      structureType,
      studioGear,
      shouldGenerateAlbumArt
    }, (data) => {
      addToHistory({
        id: Date.now().toString(),
        timestamp: Date.now(),
        prompt,
        mode,
        userLyrics,
        albumArt: data.albumArt,
        result: data.result
      });
    });
  };

  const copyToClipboard = async (text: string, type: 'title' | 'style' | 'lyrics' | 'all') => {
    try {
      await navigator.clipboard.writeText(text);
      switch (type) {
        case 'title': setCopiedTitle(true); break;
        case 'style': setCopiedStyle(true); break;
        case 'lyrics': setCopiedLyrics(true); break;
        case 'all': setCopiedAll(true); break;
      }
      setTimeout(() => {
        switch (type) {
          case 'title': setCopiedTitle(false); break;
          case 'style': setCopiedStyle(false); break;
          case 'lyrics': setCopiedLyrics(false); break;
          case 'all': setCopiedAll(false); break;
        }
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Nepodařilo se zkopírovat text.');
    }
  };

  const handleUseHistoryItem = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setMode(item.mode);
    setUserLyrics(item.userLyrics || '');
    setIsInstrumental(item.mode === 'refine' ? item.result.lyricsBox.includes('[INST]') : (item.albumArt !== null));
    setVocalIntensity(item.result.styleBox.includes('vocal intensity') ? item.result.styleBox.split('vocal intensity:')[1]?.split(',')[0].trim() as VocalIntensity : 'auto');
    setAudioProduction(item.result.styleBox.includes('audio production') ? item.result.styleBox.split('audio production:')[1]?.split(',')[0].trim() as AudioProduction : 'auto');
    setVocalExtras(item.result.styleBox.includes('vocal extras') ? item.result.styleBox.split('vocal extras:')[1]?.split(',')[0].trim() as VocalExtras : 'auto');
    setVocalGender(item.result.styleBox.includes('vocal gender') ? item.result.styleBox.split('vocal gender:')[1]?.split(',')[0].trim() as VocalGender : 'auto');
    setVocalDensity(item.result.styleBox.includes('vocal density') ? item.result.styleBox.split('vocal density:')[1]?.split(',')[0].trim() as VocalDensity : 'auto');
    setLanguageOverride(item.result.styleBox.includes('language') ? item.result.styleBox.split('language:')[1]?.split(',')[0].trim() : 'auto');
    setStructureType(item.result.styleBox.includes('structure') ? item.result.styleBox.split('structure:')[1]?.split(',')[0].trim() as StructureType : 'auto');
    setStudioGear(item.result.styleBox.includes('studio gear') ? item.result.styleBox.split('studio gear:')[1]?.split(',')[0].trim() : 'auto');
    setAlbumArt(item.albumArt || null);
    setResult(item.result);
    setAppliedSettings(null);
    setIsHistoryOpen(false);
  };

  const syllableCount = useMemo(() => {
    if (!result) return 0;
    return countSyllables(result.lyricsBox);
  }, [result]);

  const hasResult = !!result;

  return (
    <div className={`min-h-screen theme-bg text-zinc-50 ${theme.fontFamily === 'mono' ? 'font-mono' : 'font-sans'} selection:bg-white/20 relative transition-colors duration-500`}>
      <BackgroundEffects hasResult={hasResult} />

      <AnimatePresence>
        {isHistoryOpen && (
          <HistorySidebar 
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            filteredHistory={filteredHistory}
            onDelete={deleteHistoryItem}
            onClear={clearHistory}
            historySearch={historySearch}
            setHistorySearch={setHistorySearch}
            historyFilterMode={historyFilterMode}
            setHistoryFilterMode={setHistoryFilterMode}
            historySortOrder={historySortOrder}
            setHistorySortOrder={setHistorySortOrder}
            onUseHistoryItem={handleUseHistoryItem}
            onCopy={copyToClipboard}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isThemeOpen && (
          <ThemeModal
            theme={theme}
            setTheme={setTheme}
            onClose={() => setIsThemeOpen(false)}
            resetToAuto={resetThemeToAuto}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSettingsOpen && (
          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            prompt={prompt}
            setPrompt={setPrompt}
            mode={mode}
            setMode={setMode}
            isInstrumental={isInstrumental}
            setIsInstrumental={setIsInstrumental}
            vocalIntensity={vocalIntensity}
            setVocalIntensity={setVocalIntensity}
            audioProduction={audioProduction}
            setAudioProduction={setAudioProduction}
            vocalExtras={vocalExtras}
            setVocalExtras={setVocalExtras}
            vocalGender={vocalGender}
            setVocalGender={setVocalGender}
            vocalDensity={vocalDensity}
            setVocalDensity={setVocalDensity}
            languageOverride={languageOverride}
            setLanguageOverride={setLanguageOverride}
            structureType={structureType}
            setStructureType={setStructureType}
            studioGear={studioGear}
            setStudioGear={setStudioGear}
            shouldGenerateAlbumArt={shouldGenerateAlbumArt}
            setShouldGenerateAlbumArt={setShouldGenerateAlbumArt}
            appliedSettings={appliedSettings}
            setAppliedSettings={setAppliedSettings}
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            resetToAuto={() => {
              setVocalIntensity('auto');
              setAudioProduction('auto');
              setVocalExtras('auto');
              setVocalGender('auto');
              setVocalDensity('auto');
              setLanguageOverride('auto');
              setStructureType('auto');
              setStudioGear('auto');
              setIsInstrumental(false);
            }}
            theme={theme}
            setTheme={setTheme}
            dragControls={dragControls}
          />
        )}
      </AnimatePresence>

      <div
        className={`max-w-4xl mx-auto px-2 md:px-4 relative z-10 flex flex-col transition-all duration-500 ${!hasResult ? 'min-h-[92dvh] justify-center py-4' : 'min-h-screen py-4 md:py-12'}`}
      >
        <Header 
          onOpenTheme={() => setIsThemeOpen(true)}
          onOpenHistory={() => setIsHistoryOpen(true)}
          hasResult={hasResult}
        />

        <main
          className={`space-y-4 md:space-y-8 ${!hasResult ? 'max-w-2xl mx-auto w-full' : ''}`}
        >
          {error && (
            <div className="w-full bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-[15px]">
              {error}
            </div>
          )}
          
          <InputPanel 
            prompt={prompt}
            setPrompt={setPrompt}
            isInstrumental={isInstrumental}
            setIsInstrumental={setIsInstrumental}
            mode={mode}
            setMode={setMode}
            isAutoMode={isAutoMode}
            setIsAutoMode={setIsAutoMode}
            isLoading={isLoading}
            loadingStep={loadingStep}
            onGenerate={handleGenerate}
            hasResult={hasResult}
            onOpenSettings={() => setIsSettingsOpen(true)}
            userLyrics={userLyrics}
            setUserLyrics={setUserLyrics}
          />

          <AnimatePresence mode="wait">
            {result && (
              <ResultSection 
                result={result}
                appliedSettings={appliedSettings}
                syllableCount={syllableCount}
                showSyllables={showSyllables}
                setShowSyllables={setShowSyllables}
                albumArt={albumArt}
                copiedTitle={copiedTitle}
                setCopiedTitle={setCopiedTitle}
                copiedStyle={copiedStyle}
                setCopiedStyle={setCopiedStyle}
                copiedLyrics={copiedLyrics}
                setCopiedLyrics={setCopiedLyrics}
                copiedAll={copiedAll}
                setCopiedAll={setCopiedAll}
                copyToClipboard={copyToClipboard}
                theme={theme}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
