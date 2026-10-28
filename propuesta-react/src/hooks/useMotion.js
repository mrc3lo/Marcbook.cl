import { useEffect, useState } from 'react';

export function useMotion() {
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (media.matches) setMotion(false);
    const change = event => { if (event.matches) setMotion(false); };
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  const toggleMotion = () => setMotion(current => !current);
  return { motion, toggleMotion };
}
