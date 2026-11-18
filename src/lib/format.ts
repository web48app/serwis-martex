import type { PriceItem } from '@/content/types';

/** 4.8 → „4,8” */
export function formatRating(value: number): string {
  return value.toFixed(1).replace('.', ',');
}

export function formatPrice(item: PriceItem): { amount: string; unit: string } {
  if (item.from === null) return { amount: 'zadzwoń', unit: '' };
  return { amount: `od ${item.from} zł`, unit: item.unit ? `/ ${item.unit}` : '' };
}

export function initial(name: string): string {
  return (name.trim().charAt(0) || 'K').toUpperCase();
}

export const pad2 = (n: number) => String(n).padStart(2, '0');
