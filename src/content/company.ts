import siteConfig from '../../site.config.json';
import type { WeeklyHours } from './types';

/**
 * Dane firmy — jedno źródło prawdy dla całej strony (nagłówek, stopka, kontakt, SEO, polityka).
 * Puste pola (nip, regon, email) nie są nigdzie wyświetlane.
 */
export const company = {
  name: 'Serwis Samochodowy Martex',
  shortName: 'Martex',
  /** Pełna nazwa z CEIDG/KRS, np. „Martex Jan Kowalski” */
  legalName: 'Serwis Samochodowy Martex',
  nip: '',
  regon: '',
  email: '',
  phone: { display: '605 554 349', e164: '+48605554349' },
  address: {
    street: 'ul. Bielatowicza 5',
    streetShort: 'Bielatowicza 5',
    postalCode: '33-100',
    city: 'Tarnów',
  },
  geo: { lat: 50.02672, lng: 20.9830121, plusCode: '2XGM+M6 Tarnów' },
  /** Docelowa domena — zmieniasz w site.config.json (używa jej też sitemap i robots.txt). */
  siteUrl: siteConfig.siteUrl,
  google: {
    cid: '10363310737192749971',
    placeId: 'ChIJvUtzHCODPUcRk4tdUzXg0Y8',
    /** Wartości zapasowe — nadpisywane na żywo przez /api/opinie */
    rating: 4.8,
    reviewCount: 101,
  },
  stations: 7,
  brandsCount: 40,
} as const;

export const hours: WeeklyHours = {
  0: null,
  1: { open: 8, close: 17 },
  2: { open: 8, close: 17 },
  3: { open: 8, close: 17 },
  4: { open: 8, close: 17 },
  5: { open: 8, close: 17 },
  6: { open: 8, close: 14 },
};

const destination = encodeURIComponent(
  `${company.name}, ${company.address.streetShort}, ${company.address.postalCode} ${company.address.city}`,
);

export const links = {
  tel: `tel:${company.phone.e164}`,
  sms: `sms:${company.phone.e164}`,
  googleProfile: `https://www.google.com/maps?cid=${company.google.cid}`,
  googleWriteReview: `https://search.google.com/local/writereview?placeid=${company.google.placeId}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${destination}`,
  waze: `https://waze.com/ul?ll=${company.geo.lat},${company.geo.lng}&navigate=yes`,
  mapEmbed: `https://maps.google.com/maps?q=${destination}&z=16&output=embed`,
  author: 'https://web48.app',
} as const;

export const fullAddress = `${company.address.street}, ${company.address.postalCode} ${company.address.city}`;
