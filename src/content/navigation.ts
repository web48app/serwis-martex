import type { NavItem } from './types';

/** Zmień na false, aby ukryć cennik w menu i przed Google (strona dalej działa pod /cennik). */
export const PRICING_PUBLIC = true;

export const navigation: NavItem[] = [
  { to: '/', label: 'Start', inNav: true, inFooter: true },
  { to: '/uslugi', label: 'Usługi', inNav: true, inFooter: true },
  { to: '/cennik', label: 'Cennik', inNav: PRICING_PUBLIC, inFooter: PRICING_PUBLIC },
  { to: '/o-firmie', label: 'O firmie', inNav: true, inFooter: true },
  { to: '/#opinie', label: 'Opinie', inNav: true, inFooter: true },
  { to: '/kontakt', label: 'Kontakt', inNav: true, inFooter: false },
  { to: '/kontakt', label: 'Kontakt i dojazd', inNav: false, inFooter: true },
];
