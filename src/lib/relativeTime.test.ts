import { describe, expect, it } from 'vitest';
import { plural, timeAgoPl } from './relativeTime';

const NOW = new Date('2026-11-18T12:00:00Z');
const daysAgo = (d: number) => new Date(NOW.getTime() - d * 864e5).toISOString();

describe('plural', () => {
  it.each([
    [1, 'tydzień'],
    [2, 'tygodnie'],
    [4, 'tygodnie'],
    [5, 'tygodni'],
    [12, 'tygodni'],
    [22, 'tygodnie'],
    [25, 'tygodni'],
  ])('%i → %s', (n, word) => expect(plural(n, 'tydzień', 'tygodnie', 'tygodni')).toBe(word));
});

describe('timeAgoPl', () => {
  it.each([
    [0.2, 'dzisiaj'],
    [1.5, 'wczoraj'],
    [3, '3 dni temu'],
    [8, 'tydzień temu'],
    [21, '3 tygodnie temu'],
    [40, 'miesiąc temu'],
    [150, '5 miesięcy temu'],
    [400, 'rok temu'],
    [800, '2 lata temu'],
    [2000, '5 lat temu'],
  ])('%f dni → %s', (d, label) => expect(timeAgoPl(daysAgo(d), NOW)).toBe(label));

  it('pusta lub błędna data → pusty tekst', () => {
    expect(timeAgoPl('', NOW)).toBe('');
    expect(timeAgoPl('nie-data', NOW)).toBe('');
  });
});
