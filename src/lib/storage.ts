/** localStorage, który nigdy nie rzuca (tryb prywatny, zablokowane cookies, SSR). */
export const storage = {
  get(key: string): string | null {
    try {
      return typeof window === 'undefined' ? null : window.localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key: string, value: string): void {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* brak dostępu do pamięci — ustawienie obowiązuje tylko w tej wizycie */
    }
  },
};

export const STORAGE_KEYS = {
  theme: 'martex-theme',
  consent: 'martex-consent',
} as const;
