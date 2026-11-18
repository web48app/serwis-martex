import { useCallback, useEffect, useState } from 'react';
import { applyTheme, readTheme, saveTheme, type Theme } from '@/lib/theme';

export function useTheme(): [Theme, () => void] {
  // SSR i pierwszy render: ciemny; prawdziwą wartość ustawia skrypt w <head> i efekt poniżej.
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const t = readTheme();
    setTheme(t);
    applyTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      saveTheme(next);
      return next;
    });
  }, []);

  return [theme, toggle];
}
