import { company, hours, links } from '@/content/company';
import { formatHour } from '@/lib/openingHours';
import type { Weekday } from '@/content/types';

const SCHEMA_DAYS: Record<Weekday, string> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const pad = (h: number) => formatHour(h).padStart(5, '0');

/** Grupuje dni o tych samych godzinach: Pn–Pt 8–17 → jeden wpis. */
function openingHoursSpecification() {
  const groups = new Map<string, { opens: string; closes: string; days: string[] }>();
  (Object.keys(hours) as unknown as Weekday[]).forEach((k) => {
    const d = Number(k) as Weekday;
    const h = hours[d];
    if (!h) return;
    const key = `${h.open}-${h.close}`;
    const g = groups.get(key) ?? { opens: pad(h.open), closes: pad(h.close), days: [] };
    g.days.push(SCHEMA_DAYS[d]);
    groups.set(key, g);
  });
  return [...groups.values()].map((g) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: g.days,
    opens: g.opens,
    closes: g.closes,
  }));
}

export function localBusinessLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    '@id': `${company.siteUrl}/#firma`,
    name: company.name,
    url: `${company.siteUrl}/`,
    image: `${company.siteUrl}/img/og.jpg`,
    logo: `${company.siteUrl}/img/logo.png`,
    telephone: company.phone.e164,
    ...(company.email ? { email: company.email } : {}),
    ...(company.nip ? { taxID: company.nip } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.streetShort,
      postalCode: company.address.postalCode,
      addressLocality: company.address.city,
      addressCountry: 'PL',
    },
    geo: { '@type': 'GeoCoordinates', latitude: company.geo.lat, longitude: company.geo.lng },
    openingHoursSpecification: openingHoursSpecification(),
    hasMap: links.googleProfile,
    areaServed: company.address.city,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: company.google.rating,
      reviewCount: company.google.reviewCount,
      bestRating: 5,
    },
  };
}

export function breadcrumbLd(name: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Start', item: `${company.siteUrl}/` },
      { '@type': 'ListItem', position: 2, name, item: `${company.siteUrl}${path}` },
    ],
  };
}
