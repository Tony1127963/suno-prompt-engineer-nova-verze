export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  glassColor: string;
  glassOpacity: number;
  blur: number;
  radius: string;
  glow: number;
  panelOpacity: number;
  panelBlur: number;
  borderOpacity: number;
  shadowIntensity: number;
  fontFamily: 'sans' | 'mono';
  aiPanelColor: string;
  aiPanelOpacity: number;
}

export const THEMES: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#000000',
    glassColor: '#18181b',
    glassOpacity: 0.45,
    blur: 32,
    radius: '1.5',
    glow: 0.12,
    panelOpacity: 0.08,
    panelBlur: 16,
    borderOpacity: 0.1,
    shadowIntensity: 0.5,
    fontFamily: 'sans',
    aiPanelColor: '#6366f1',
    aiPanelOpacity: 0.1
  },
  {
    id: 'midnight',
    name: 'Midnight',
    primary: '#0A84FF',
    secondary: '#BF5AF2',
    background: '#000000',
    glassColor: '#000000',
    glassOpacity: 0.3,
    blur: 48,
    radius: '2',
    glow: 0.08,
    panelOpacity: 0.05,
    panelBlur: 24,
    borderOpacity: 0.05,
    shadowIntensity: 0.3,
    fontFamily: 'sans',
    aiPanelColor: '#8b5cf6',
    aiPanelOpacity: 0.08
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    primary: '#FF2D55',
    secondary: '#FF9500',
    background: '#050505',
    glassColor: '#18181b',
    glassOpacity: 0.35,
    blur: 24,
    radius: '1.25',
    glow: 0.18,
    panelOpacity: 0.12,
    panelBlur: 12,
    borderOpacity: 0.15,
    shadowIntensity: 0.7,
    fontFamily: 'sans',
    aiPanelColor: '#f43f5e',
    aiPanelOpacity: 0.15
  },
  {
    id: 'emerald',
    name: 'Emerald',
    primary: '#34C759',
    secondary: '#30B0C7',
    background: '#010a01',
    glassColor: '#010a01',
    glassOpacity: 0.3,
    blur: 32,
    radius: '1.75',
    glow: 0.15,
    panelOpacity: 0.07,
    panelBlur: 20,
    borderOpacity: 0.08,
    shadowIntensity: 0.4,
    fontFamily: 'sans',
    aiPanelColor: '#10b981',
    aiPanelOpacity: 0.12
  },
  {
    id: 'mono',
    name: 'Mono',
    primary: '#FFFFFF',
    secondary: '#8E8E93',
    background: '#000000',
    glassColor: '#000000',
    glassOpacity: 0.15,
    blur: 40,
    radius: '1.5',
    glow: 0.03,
    panelOpacity: 0.03,
    panelBlur: 32,
    borderOpacity: 0.2,
    shadowIntensity: 0.2,
    fontFamily: 'mono',
    aiPanelColor: '#ffffff',
    aiPanelOpacity: 0.05
  }
];
