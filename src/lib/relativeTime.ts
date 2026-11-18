/** Polska odmiana liczebników: 1 tydzień, 2–4 tygodnie, 5+ tygodni (z wyjątkiem 12–14). */
export function plural(n: number, one: string, few: string, many: string): string {
  if (n === 1) return one;
  const mod10 = n % 10;
  const mod100 = n % 100;
  return mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20) ? few : many;
}

const DAY = 864e5;

/** „dzisiaj”, „wczoraj”, „3 dni temu”, „2 tygodnie temu”, „5 miesięcy temu”, „rok temu”… */
export function timeAgoPl(iso: string, now: Date = new Date()): string {
  const then = new Date(iso);
  if (!iso || Number.isNaN(then.getTime())) return '';
  const days = (now.getTime() - then.getTime()) / DAY;
  if (days < 1) return 'dzisiaj';
  if (days < 2) return 'wczoraj';
  if (days < 7) return `${Math.floor(days)} dni temu`;
  if (days < 30) {
    const n = Math.floor(days / 7);
    return n === 1 ? 'tydzień temu' : `${n} ${plural(n, 'tydzień', 'tygodnie', 'tygodni')} temu`;
  }
  if (days < 365) {
    const n = Math.floor(days / 30);
    return n === 1 ? 'miesiąc temu' : `${n} ${plural(n, 'miesiąc', 'miesiące', 'miesięcy')} temu`;
  }
  const n = Math.floor(days / 365);
  return n === 1 ? 'rok temu' : `${n} ${plural(n, 'rok', 'lata', 'lat')} temu`;
}
