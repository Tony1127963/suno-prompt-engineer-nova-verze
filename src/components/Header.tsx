import { Music, Palette, ListOrdered } from 'lucide-react';

interface HeaderProps {
  onOpenTheme: () => void;
  onOpenHistory: () => void;
  hasResult: boolean;
}

export function Header({ onOpenTheme, onOpenHistory, hasResult }: HeaderProps) {
  return (
    <>
      <div className="absolute top-2 right-2 md:top-8 md:right-8 flex gap-2 z-50">
        <button 
          onClick={onOpenHistory} 
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
          title="Historie"
        >
          <ListOrdered className="w-5 h-5 text-zinc-400 group-hover:text-white transition-all duration-300" />
        </button>
        <button 
          onClick={onOpenTheme} 
          className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors group"
          title="Vzhled a Motivy"
        >
          <Palette className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:rotate-12 transition-all duration-300" />
        </button>
      </div>

      <header
        className={`text-center transition-all duration-500 ${!hasResult ? 'mb-6 md:mb-12' : 'mb-4 md:mb-8 pt-4 md:pt-0'}`}
      >
        <div className="inline-flex items-center justify-center p-2.5 bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] rounded-2xl mb-3 ring-1 ring-[color-mix(in_srgb,var(--primary)_20%,transparent)] shadow-lg shadow-[color-mix(in_srgb,var(--primary)_10%,transparent)] transition-colors duration-500">
          <Music className="w-6 h-6 theme-primary-text transition-colors duration-500" />
        </div>
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight mb-1 bg-gradient-to-br from-white to-zinc-400 bg-clip-text text-transparent">
          Suno Prompt Engineer
        </h1>
        <p className="text-zinc-500 text-sm md:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
          Transform your ideas into technical Suno v5 Pro prompts.
        </p>
      </header>
    </>
  );
}

