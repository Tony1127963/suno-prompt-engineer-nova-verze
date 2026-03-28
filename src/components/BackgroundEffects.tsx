import { motion } from 'motion/react';

interface BackgroundEffectsProps {
  hasResult: boolean;
}

export function BackgroundEffects({ hasResult }: BackgroundEffectsProps) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div 
        animate={{
          x: hasResult ? '-60%' : '-50%',
          y: hasResult ? '-60%' : '-50%',
          scale: hasResult ? 1.2 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        className="absolute top-0 left-1/2 w-[800px] h-[600px] theme-glow-1 blur-[120px] rounded-full will-change-transform transform-gpu" 
      />
      <motion.div 
        animate={{
          x: hasResult ? '20%' : '33%',
          y: hasResult ? '20%' : '33%',
          scale: hasResult ? 1.1 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 100 }}
        className="absolute bottom-0 right-0 w-[600px] h-[600px] theme-glow-2 blur-[120px] rounded-full will-change-transform transform-gpu" 
      />
    </div>
  );
}
