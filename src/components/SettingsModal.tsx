import { memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Globe, ListOrdered, SlidersHorizontal, Users, Mic2, Activity, AlignLeft } from 'lucide-react';
import { 
  StructureType, 
  AudioProduction, 
  VocalExtras, 
  VocalGender, 
  VocalIntensity, 
  VocalDensity 
} from '../services/gemini';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: string;
  setLanguage: (val: string) => void;
  structure: StructureType;
  setStructure: (val: StructureType) => void;
  production: AudioProduction;
  setProduction: (val: AudioProduction) => void;
  vocalEffects: VocalExtras;
  setVocalEffects: (val: VocalExtras) => void;
  vocalGender: VocalGender;
  setVocalGender: (val: VocalGender) => void;
  vocalIntensity: VocalIntensity;
  setVocalIntensity: (val: VocalIntensity) => void;
  vocalDensity: VocalDensity;
  setVocalDensity: (val: VocalDensity) => void;
  isInstrumental: boolean;
  setIsInstrumental: (val: boolean) => void;
}

const OptionGroup = ({ title, icon: Icon, children }: any) => (
  <div className="py-6 border-b border-white/5 last:border-0">
    <div className="flex items-center gap-3 mb-4 px-2">
      <Icon className="w-5 h-5 theme-primary-text" />
      <h3 className="text-[17px] font-medium text-white">{title}</h3>
    </div>
    <div className="bg-[#1c1c1e] rounded-2xl p-1.5">
      {children}
    </div>
  </div>
);

const OptionButton = ({ active, onClick, children, className = "" }: any) => (
  <button
    onClick={onClick}
    className={`py-2.5 px-2 rounded-xl text-[15px] font-medium transition-all ${
      active 
      ? 'bg-[#2c2c2e] text-white shadow-sm' 
      : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
    } ${className}`}
  >
    {children}
  </button>
);

export const SettingsModal = memo(({
  isOpen,
  onClose,
  language,
  setLanguage,
  structure,
  setStructure,
  production,
  setProduction,
  vocalEffects,
  setVocalEffects,
  vocalGender,
  setVocalGender,
  vocalIntensity,
  setVocalIntensity,
  vocalDensity,
  setVocalDensity,
  isInstrumental,
  setIsInstrumental
}: SettingsModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-2xl bg-[#121212] sm:rounded-[32px] rounded-t-[32px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div className="flex-shrink-0 pt-4 pb-2 px-6 flex flex-col items-center bg-[#121212] z-10">
            <div className="w-12 h-1.5 bg-zinc-800 rounded-full mb-6" />
            <div className="flex items-center justify-between w-full">
              <h2 className="text-xl font-bold text-white">Pokročilé nastavení</h2>
              <button 
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 sm:px-6 pb-8">
            <OptionGroup title="Jazyk textu" icon={Globe}>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'auto', label: 'AUTO' },
                  { id: 'Czech', label: 'CZ' },
                  { id: 'Slovak', label: 'SK' },
                  { id: 'English', label: 'EN' },
                  { id: 'German', label: 'DE' },
                  { id: 'Spanish', label: 'ES' },
                  { id: 'French', label: 'FR' },
                  { id: 'Italian', label: 'IT' },
                  { id: 'Japanese', label: 'JP' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={language === opt.id} onClick={() => setLanguage(opt.id)} className="flex-1 min-w-[18%]">
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="Struktura písně" icon={ListOrdered}>
              <div className="grid grid-cols-2 gap-1">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'standard', label: 'Pop/Rock' },
                  { id: 'edm', label: 'EDM' },
                  { id: 'rap', label: 'Rap' },
                  { id: 'classical', label: 'Klasika' },
                  { id: 'ambient', label: 'Ambient' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={structure === opt.id} onClick={() => setStructure(opt.id as StructureType)}>
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="Kvalita zvuku" icon={SlidersHorizontal}>
              <div className="flex flex-wrap gap-1">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'standard', label: 'Standard' },
                  { id: 'studio', label: 'Studio' },
                  { id: 'cinematic', label: 'Film' },
                  { id: 'live', label: 'Live' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={production === opt.id} onClick={() => setProduction(opt.id as AudioProduction)} className="flex-1 min-w-[18%]">
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="Vokální efekty" icon={Users}>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'none', label: 'Nic' },
                  { id: 'choir', label: 'Sbor' },
                  { id: 'harmonies', label: 'Dvojhlas' },
                  { id: 'intimate', label: 'Blízko' },
                  { id: 'vocoder', label: 'Vocoder' },
                  { id: 'autotune', label: 'Tune' },
                  { id: 'megaphone', label: 'Mega' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={vocalEffects === opt.id} onClick={() => setVocalEffects(opt.id as VocalExtras)}>
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="Kdo má zpívat?" icon={Mic2}>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'male', label: 'Muž' },
                  { id: 'female', label: 'Žena' },
                  { id: 'both', label: 'Duet' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={vocalGender === opt.id} onClick={() => setVocalGender(opt.id as VocalGender)}>
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="Intenzita zpěvu" icon={Activity}>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'soft', label: 'Jemný' },
                  { id: 'normal', label: 'Normální' },
                  { id: 'powerful', label: 'Silný' },
                  { id: 'operatic', label: 'Operní' },
                  { id: 'aggressive', label: 'Agresivní' },
                  { id: 'dynamic', label: 'Dynamický' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={vocalIntensity === opt.id} onClick={() => setVocalIntensity(opt.id as VocalIntensity)}>
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>

            <OptionGroup title="Hustota textu" icon={AlignLeft}>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'auto', label: 'Auto' },
                  { id: 'dense', label: 'Hustá' },
                  { id: 'sparse', label: 'Řídká' },
                  { id: 'chops', label: 'Chops' },
                ].map(opt => (
                  <OptionButton key={opt.id} active={vocalDensity === opt.id} onClick={() => setVocalDensity(opt.id as VocalDensity)}>
                    {opt.label}
                  </OptionButton>
                ))}
              </div>
            </OptionGroup>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
});
