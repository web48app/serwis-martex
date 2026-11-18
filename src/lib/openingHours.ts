import type { DayHours, Weekday, WeeklyHours } from '@/content/types';

export const TIME_ZONE = 'Europe/Warsaw';

const WEEKDAY_INDEX: Record<string, Weekday> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
const ON_DAY: Record<Weekday, string> = {
  0: 'w niedzielę',
  1: 'w poniedziałek',
  2: 'we wtorek',
  3: 'w środę',
  4: 'w czwartek',
  5: 'w piątek',
  6: 'w sobotę',
};
export const DAY_NAMES: Record<Weekday, string> = {
  0: 'Niedziela',
  1: 'Poniedziałek',
  2: 'Wtorek',
  3: 'Środa',
  4: 'Czwartek',
  5: 'Piątek',
  6: 'Sobota',
};
/** Kolejność wyświetlania tygodnia (od poniedziałku). */
export const WEEK_ORDER: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

export interface ZonedNow {
  weekday: Weekday;
  /** Godzina jako ułamek doby, np. 13.5 = 13:30 */
  time: number;
}

/** Aktualny dzień i godzina w Polsce — niezależnie od strefy czasowej odwiedzającego. */
export function nowInZone(date: Date = new Date(), timeZone = TIME_ZONE): ZonedNow {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return {
    weekday: WEEKDAY_INDEX[get('weekday')] ?? 0,
    time: Number(get('hour')) + Number(get('minute')) / 60,
  };
}

export function formatHour(h: number): string {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${hh}:${String(mm).padStart(2, '0')}`;
}

export function formatRange(day: DayHours, pad = false): string {
  if (!day) return 'nieczynne';
  const f = (h: number) => (pad ? formatHour(h).padStart(5, '0') : formatHour(h));
  return `${f(day.open)} – ${f(day.close)}`;
}

export interface OpenStatus {
  open: boolean;
  label: string;
}

export function getOpenStatus(hours: WeeklyHours, now: ZonedNow): OpenStatus {
  const today = hours[now.weekday];
  if (today && now.time >= today.open && now.time < today.close) {
    return { open: true, label: `Otwarte teraz · do ${formatHour(today.close)}` };
  }
  for (let offset = 0; offset < 8; offset++) {
    const day = ((now.weekday + offset) % 7) as Weekday;
    const h = hours[day];
    if (!h) continue;
    if (offset === 0) {
      if (now.time < h.open)
        return { open: false, label: `Zamknięte · otwieramy dziś o ${formatHour(h.open)}` };
      continue;
    }
    const when = offset === 1 ? 'jutro' : ON_DAY[day];
    return { open: false, label: `Zamknięte · otwieramy ${when} o ${formatHour(h.open)}` };
  }
  return { open: false, label: 'Zamknięte' };
}

/** Krótki opis tygodnia, np. „Pn–Pt 8:00–17:00 · Sob 8:00–14:00”. */
export function summarizeHours(hours: WeeklyHours): string {
  const wk = hours[1];
  const sat = hours[6];
  const parts: string[] = [];
  if (wk) parts.push(`Pn–Pt ${formatHour(wk.open)}–${formatHour(wk.close)}`);
  if (sat) parts.push(`Sob ${formatHour(sat.open)}–${formatHour(sat.close)}`);
  return parts.join(' · ');
}
