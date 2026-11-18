import { describe, expect, it } from 'vitest';
import { hours } from '@/content/company';
import { formatHour, formatRange, getOpenStatus, nowInZone, summarizeHours } from './openingHours';

describe('getOpenStatus', () => {
  it('otwarte w dzień roboczy w godzinach pracy', () => {
    expect(getOpenStatus(hours, { weekday: 3, time: 10 })).toEqual({
      open: true,
      label: 'Otwarte teraz · do 17:00',
    });
  });

  it('w sobotę zamyka się o 14:00', () => {
    expect(getOpenStatus(hours, { weekday: 6, time: 13.99 }).open).toBe(true);
    expect(getOpenStatus(hours, { weekday: 6, time: 14 }).label).toBe(
      'Zamknięte · otwieramy w poniedziałek o 8:00',
    );
  });

  it('rano przed otwarciem pokazuje „dziś”', () => {
    expect(getOpenStatus(hours, { weekday: 2, time: 7.5 }).label).toBe('Zamknięte · otwieramy dziś o 8:00');
  });

  it('wieczorem w dzień roboczy pokazuje „jutro”', () => {
    expect(getOpenStatus(hours, { weekday: 4, time: 18 }).label).toBe('Zamknięte · otwieramy jutro o 8:00');
  });

  it('w niedzielę pokazuje „jutro” (poniedziałek)', () => {
    expect(getOpenStatus(hours, { weekday: 0, time: 12 }).label).toBe('Zamknięte · otwieramy jutro o 8:00');
  });

  it('godzina zamknięcia jest już poza godzinami pracy', () => {
    expect(getOpenStatus(hours, { weekday: 1, time: 17 }).open).toBe(false);
  });
});

describe('nowInZone', () => {
  it('liczy czas w Europe/Warsaw, nie w strefie maszyny', () => {
    // 2026-11-18 22:30 UTC = środa 23:30 w Warszawie (CET, UTC+1)
    expect(nowInZone(new Date('2026-11-18T22:30:00Z'))).toEqual({ weekday: 3, time: 23.5 });
    // lato: 2026-07-01 06:00 UTC = środa 08:00 (CEST, UTC+2)
    expect(nowInZone(new Date('2026-07-01T06:00:00Z'))).toEqual({ weekday: 3, time: 8 });
  });
});

describe('formatowanie', () => {
  it('formatHour', () => {
    expect(formatHour(8)).toBe('8:00');
    expect(formatHour(17.5)).toBe('17:30');
  });
  it('formatRange', () => {
    expect(formatRange({ open: 8, close: 17 }, true)).toBe('08:00 – 17:00');
    expect(formatRange(null)).toBe('nieczynne');
  });
  it('summarizeHours', () => {
    expect(summarizeHours(hours)).toBe('Pn–Pt 8:00–17:00 · Sob 8:00–14:00');
  });
});
