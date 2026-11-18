import { useEffect, useState } from 'react';

/** Animuje liczbę od 0 do `target`, gdy `start` = true. SSR/bez JS: od razu wartość końcowa. */
export function useCountUp(target: number, start: boolean, decimals = 0, duration = 1400): string {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!start) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / duration);
      setValue(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return value.toFixed(decimals).replace('.', ',');
}
