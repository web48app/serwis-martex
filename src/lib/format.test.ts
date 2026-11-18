import { describe, expect, it } from 'vitest';
import { formatPrice, formatRating, initial, pad2 } from './format';

describe('format', () => {
  it('formatRating używa przecinka', () => {
    expect(formatRating(4.8)).toBe('4,8');
    expect(formatRating(5)).toBe('5,0');
  });
  it('formatPrice', () => {
    expect(formatPrice({ name: 'x', from: 150, unit: 'kpl' })).toEqual({
      amount: 'od 150 zł',
      unit: '/ kpl',
    });
    expect(formatPrice({ name: 'x', from: 70 })).toEqual({ amount: 'od 70 zł', unit: '' });
    expect(formatPrice({ name: 'x', from: null })).toEqual({ amount: 'zadzwoń', unit: '' });
  });
  it('initial', () => {
    expect(initial(' anna ')).toBe('A');
    expect(initial('')).toBe('K');
  });
  it('pad2', () => expect(pad2(3)).toBe('03'));
});
