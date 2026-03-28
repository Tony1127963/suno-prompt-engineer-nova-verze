import { useState, useEffect } from 'react';
import { Theme, THEMES } from '../constants';

// Dynamic style element for theme CSS classes
let styleElement: HTMLStyleElement | null = null;

function getOrCreateStyleElement(): HTMLStyleElement {
  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.id = 'theme-styles';
    document.head.appendChild(styleElement);
  }
  return styleElement;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('suno-theme');
    const defaultTheme = THEMES[0];
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultTheme, ...parsed };
      } catch (e) {
        return defaultTheme;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('suno-theme', JSON.stringify(theme));
  }, [theme]);

  // Apply CSS variables and theme classes (matching original inline <style>)
  useEffect(() => {
    const root = document.documentElement;
    // Set CSS custom properties using ORIGINAL variable names
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--bg', theme.background);
    root.style.setProperty('--glass-color', theme.glassColor || '#18181b');
    root.style.setProperty('--glass', `color-mix(in srgb, ${theme.glassColor || '#18181b'}, transparent ${Math.round((1 - theme.glassOpacity) * 100)}%)`);
    root.style.setProperty('--blur', `blur(${theme.blur}px)`);
    root.style.setProperty('--radius', `${theme.radius}rem`);
    root.style.setProperty('--glow', String(theme.glow));
    root.style.setProperty('--panel-bg', `rgba(255, 255, 255, ${theme.panelOpacity})`);
    root.style.setProperty('--panel-blur', `blur(${theme.panelBlur}px)`);
    root.style.setProperty('--border-opacity', String(theme.borderOpacity));
    root.style.setProperty('--shadow-opacity', String(theme.shadowIntensity * 0.4));
    root.style.setProperty('--shadow-size', `${theme.shadowIntensity * 30}px`);

    // Inject theme CSS classes (identical to original inline <style>)
    const el = getOrCreateStyleElement();
    el.textContent = `
      .theme-bg { background-color: var(--bg); }
      .theme-primary-text { color: var(--primary); }
      .theme-primary-bg { background-color: var(--primary); }
      .theme-glass {
        background-color: var(--glass);
        backdrop-filter: var(--blur);
        -webkit-backdrop-filter: var(--blur);
        border-radius: var(--radius);
        border: 1px solid rgba(255, 255, 255, var(--border-opacity));
        box-shadow: 0 var(--shadow-size) calc(var(--shadow-size) * 1.5) 0 rgba(0, 0, 0, var(--shadow-opacity));
        will-change: backdrop-filter;
      }
      .theme-glass-inner {
        border-radius: calc(var(--radius) * 0.75);
        background-color: var(--panel-bg);
        backdrop-filter: var(--panel-blur);
        -webkit-backdrop-filter: var(--panel-blur);
        border: 1px solid rgba(255, 255, 255, var(--border-opacity));
      }
      .theme-glow-1 {
        background-color: var(--primary);
        opacity: var(--glow);
      }
      .theme-glow-2 {
        background-color: var(--secondary);
        opacity: var(--glow);
      }
    `;
  }, [theme]);

  const resetToAuto = () => {
    setTheme(THEMES[0]);
  };

  return { theme, setTheme, resetToAuto };
}
