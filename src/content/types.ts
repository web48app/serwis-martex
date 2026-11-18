export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = niedziela (jak Date.getDay)

/** Godziny jako ułamek doby, np. 8 = 8:00, 17.5 = 17:30. `null` = nieczynne. */
export type DayHours = { open: number; close: number } | null;
export type WeeklyHours = Record<Weekday, DayHours>;

export const BR = { br: true } as const;
export type HeadingPart = string | { em: string } | typeof BR;

export interface Photo {
  /** Numer zdjęcia — plik lokalny: /img/realizacje/NN.jpg */
  n: number;
  alt: string;
}

export type ServiceIcon =
  'gearbox' | 'engine' | 'electric' | 'filter' | 'ac' | 'brake' | 'tyre' | 'suspension';

export interface Service {
  id: string;
  /** Krótki nagłówek na kafelku strony głównej */
  title: string;
  /** Etykieta w pasku kategorii na stronie usług (domyślnie = title) */
  navLabel?: string;
  /** Nagłówek na stronie usług: tekst, { em } = na czerwono, BR = nowa linia */
  heading: HeadingPart[];
  label: string;
  /** Opis na kafelku strony głównej */
  teaser: string;
  /** Opis na stronie usług */
  description: string;
  chips: string[];
  items: string[];
  photo: Photo;
  icon: ServiceIcon;
  /** Kafelek ze zdjęciem (szeroki) na stronie głównej */
  featured: boolean;
}

export interface Extra {
  title: string;
  text: string;
}

export interface PriceItem {
  name: string;
  /** Cena „od” w zł brutto. `null` = „zadzwoń”. */
  from: number | null;
  unit?: 'kpl' | 'szt';
}

export interface PriceCategory {
  id: string;
  title: string;
  items: PriceItem[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface NavItem {
  to: string;
  label: string;
  /** Pokazuj w menu górnym */
  inNav: boolean;
  /** Pokazuj w stopce */
  inFooter: boolean;
}
