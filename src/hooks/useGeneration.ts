import { useState } from 'react';
import { generateSunoPrompt, recommendSettings, generateAlbumArt, VocalIntensity, AudioProduction, VocalExtras, VocalGender, StructureType, VocalDensity } from '../services/gemini';
import { GenerationMode, GenerationResult } from '../types';

interface GenerationOptions {
  prompt: string;
  mode: GenerationMode;
  userLyrics: string;
  isInstrumental: boolean;
  isAutoMode: boolean;
  vocalIntensity: VocalIntensity;
  audioProduction: AudioProduction;
  vocalExtras: VocalExtras;
  vocalGender: VocalGender;
  vocalDensity: VocalDensity;
  languageOverride: string;
  structureType: StructureType;
  studioGear: string;
  shouldGenerateAlbumArt: boolean;
}

export function useGeneration() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [albumArt, setAlbumArt] = useState<string | null>(null);
  const [appliedSettings, setAppliedSettings] = useState<any>(null);

  const generate = async (options: GenerationOptions, onComplete?: (data: any) => void) => {
    setIsLoading(true);
    setError(null);
    setLoadingStep('Analyzuji prompt...');
    setAlbumArt(null);
    setAppliedSettings(null);

    try {
      let currentSettings = {
        vocalIntensity: options.vocalIntensity,
        audioProduction: options.audioProduction,
        vocalExtras: options.vocalExtras,
        vocalGender: options.vocalGender,
        vocalDensity: options.vocalDensity,
        language: options.languageOverride,
        structureType: options.structureType,
        studioGear: options.studioGear,
        isInstrumental: options.isInstrumental
      };

      if (options.isAutoMode) {
        setLoadingStep('AI analyzuje nejlepší nastavení...');
        try {
          const recommended = await recommendSettings(options.prompt);
          currentSettings = {
            ...currentSettings,
            ...recommended,
            isInstrumental: options.isInstrumental
          };
          setAppliedSettings(currentSettings);
        } catch (e) {
          console.warn('Auto-settings failed, falling back to manual', e);
        }
      }

      setLoadingStep(options.mode === 'refine' ? 'Vylepšuji váš text...' : 'Generuji profesionální prompt...');
      const generatedResult = await generateSunoPrompt(
        options.mode === 'refine' ? `${options.prompt}\n\nORIGINÁLNÍ TEXT K VYLEPŠENÍ:\n${options.userLyrics}` : options.prompt,
        currentSettings.isInstrumental,
        currentSettings.vocalIntensity,
        currentSettings.audioProduction,
        currentSettings.vocalExtras,
        currentSettings.vocalGender,
        currentSettings.language,
        currentSettings.structureType,
        currentSettings.vocalDensity,
        currentSettings.studioGear,
        options.mode
      );

      setResult(generatedResult);
      setLoadingStep('Generování dokončeno!');

      let artUrl = null;
      if (options.shouldGenerateAlbumArt) {
        setLoadingStep('Generuji obal alba...');
        try {
          artUrl = await generateAlbumArt(generatedResult.title, generatedResult.styleBox);
          setAlbumArt(artUrl);
        } catch (e) {
          console.warn('Album art generation failed', e);
        }
      }

      if (onComplete) {
        onComplete({
          result: generatedResult,
          albumArt: artUrl,
          appliedSettings: currentSettings
        });
      }

    } catch (err: any) {
      setError(err.message || 'Došlo k chybě při generování.');
    } finally {
      setIsLoading(false);
      setLoadingStep('');
    }
  };

  return {
    generate,
    isLoading,
    loadingStep,
    error,
    result,
    setResult,
    albumArt,
    setAlbumArt,
    appliedSettings,
    setAppliedSettings
  };
}
