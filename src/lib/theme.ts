import { storage, STORAGE_KEYS } from './storage';

export type Theme = 'dark' | 'light';

const THEME_COLOR: Record<Theme, string> = { dark: '#0a0a0b', light: '#f3f1ec' };

export function readTheme(): Theme {
  return storage.get(STORAGE_KEYS.theme) === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'light') root.setAttribute('data-theme', 'light');
  else root.removeAttribute('data-theme');
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOR[theme]);
}

export function saveTheme(theme: Theme): void {
  storage.set(STORAGE_KEYS.theme, theme);
  applyTheme(theme);
}
