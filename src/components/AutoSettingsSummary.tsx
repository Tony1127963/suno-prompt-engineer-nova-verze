import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { Theme } from '../constants';

interface AutoSettingsSummaryProps {
  appliedSettings: Record<string, string>;
  theme: Theme;
}

export function AutoSettingsSummary({ appliedSettings, theme }: AutoSettingsSummaryProps) {
  if (!appliedSettings) return null;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
      }}
      className="md:col-span-12 p-4 rounded-2xl backdrop-blur-xl shadow-lg"
      style={{
        backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} ${theme.aiPanelOpacity * 100}%, transparent)`,
        borderColor: `color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`,
        borderWidth: '1px',
        boxShadow: `0 10px 15px -3px color-mix(in srgb, ${theme.aiPanelColor} 5%, transparent)`
      }}
    >
      <h3 className="text-sm font-bold mb-3 flex items-center gap-2" style={{ color: theme.aiPanelColor }}>
        <Sparkles className="w-4 h-4" />
        AI pro tento song zvolila:
      </h3>
      <div className="flex flex-wrap gap-2">
        {appliedSettings.vocalIntensity && appliedSettings.vocalIntensity !== 'auto' && (
          <span className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`, color: `color-mix(in srgb, ${theme.aiPanelColor} 80%, white)` }}>
            <span className="mr-1" style={{ color: `color-mix(in srgb, ${theme.aiPanelColor} 70%, transparent)` }}>Zpěv:</span> 
            <span className="font-medium">{appliedSettings.vocalIntensity}</span>
          </span>
        )}
        {appliedSettings.vocalGender && appliedSettings.vocalGender !== 'auto' && (
          <span className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`, color: `color-mix(in srgb, ${theme.aiPanelColor} 80%, white)` }}>
            <span className="mr-1" style={{ color: `color-mix(in srgb, ${theme.aiPanelColor} 70%, transparent)` }}>Hlas:</span> 
            <span className="font-medium">{appliedSettings.vocalGender}</span>
          </span>
        )}
        {appliedSettings.vocalExtras && appliedSettings.vocalExtras !== 'auto' && appliedSettings.vocalExtras !== 'none' && (
          <span className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`, color: `color-mix(in srgb, ${theme.aiPanelColor} 80%, white)` }}>
            <span className="mr-1" style={{ color: `color-mix(in srgb, ${theme.aiPanelColor} 70%, transparent)` }}>Efekty zpěvu:</span> 
            <span className="font-medium">{appliedSettings.vocalExtras}</span>
          </span>
        )}
        {appliedSettings.vocalDensity && appliedSettings.vocalDensity !== 'auto' && (
          <span className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`, color: `color-mix(in srgb, ${theme.aiPanelColor} 80%, white)` }}>
            <span className="mr-1" style={{ color: `color-mix(in srgb, ${theme.aiPanelColor} 70%, transparent)` }}>Množství zpěvu:</span> 
            <span className="font-medium">{appliedSettings.vocalDensity}</span>
          </span>
        )}
        {appliedSettings.language && appliedSettings.language !== 'auto' && (
          <span className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`, color: `color-mix(in srgb, ${theme.aiPanelColor} 80%, white)` }}>
            <span className="mr-1" style={{ color: `color-mix(in srgb, ${theme.aiPanelColor} 70%, transparent)` }}>Jazyk:</span> 
            <span className="font-medium">{appliedSettings.language}</span>
          </span>
        )}
        {appliedSettings.audioProduction && appliedSettings.audioProduction !== 'auto' && (
          <span className="px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: `color-mix(in srgb, ${theme.aiPanelColor} 10%, transparent)`, border: `1px solid color-mix(in srgb, ${theme.aiPanelColor} 20%, transparent)`, color: `color-mix(in srgb, ${theme.aiPanelColor} 80%, white)` }}>
            <span className="mr-1" style={{ color: `color-mix(in srgb, ${theme.aiPanelColor} 70%, transparent)` }}>Produkce:</span> 
            <span className="font-medium">{appliedSettings.audioProduction}</span>
          </span>
        )}
      </div>
    </motion.div>
  );
}
