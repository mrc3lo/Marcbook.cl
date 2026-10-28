import { useEffect, useState } from 'react';
import { site } from '../config/site.js';

export function useTheme() {
  // Servidor y primera renderización del navegador coinciden para hidratar sin errores.
  const [theme, setTheme] = useState('dark');
  const [restored, setRestored] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(site.themeStorageKey);
      if (saved === 'light' || saved === 'dark') setTheme(saved);
    } catch {
      // El selector funciona aunque el almacenamiento esté bloqueado.
    }
    setRestored(true);
  }, []);

  useEffect(() => {
    if (!restored) return;
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', site.themeColors[theme]);
    try {
      localStorage.setItem(site.themeStorageKey, theme);
    } catch {
      // En ese caso la preferencia dura solo durante la sesión.
    }
  }, [theme, restored]);

  const toggleTheme = () => setTheme(current => current === 'dark' ? 'light' : 'dark');
  return { theme, toggleTheme };
}
