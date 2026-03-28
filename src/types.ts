export type GenerationMode = 'generate' | 'refine';

export interface GenerationResult {
  title: string;
  styleBox: string;
  lyricsBox: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  prompt: string;
  mode: GenerationMode;
  userLyrics?: string;
  albumArt?: string | null;
  result: GenerationResult;
}

export interface ThemeConfig {
  id: string;
  name: string;
  primaryColor: string;
  backgroundColor: string;
  panelColor: string;
  textColor: string;
  aiPanelColor: string;
  fontFamily: string;
}

export interface AppSettings {
  vocalIntensity?: string;
  audioProduction?: string;
  vocalExtras?: string;
  vocalGender?: string;
  vocalDensity?: string;
  language?: string;
  structureType?: string;
  studioGear?: string;
  isInstrumental?: boolean;
}
