import { storage, STORAGE_KEYS } from './storage';

/** `all` — zgoda na treści zewnętrzne (mapa Google); `necessary` — tylko niezbędne. */
export type Consent = 'all' | 'necessary';

const EVENT = 'martex:consent';
const OPEN_EVENT = 'martex:consent-open';

export function readConsent(): Consent | null {
  const v = storage.get(STORAGE_KEYS.consent);
  return v === 'all' || v === 'necessary' ? v : null;
}

export function saveConsent(value: Consent): void {
  storage.set(STORAGE_KEYS.consent, value);
  window.dispatchEvent(new CustomEvent<Consent>(EVENT, { detail: value }));
}

export function onConsentChange(cb: (value: Consent) => void): () => void {
  const handler = (e: Event) => cb((e as CustomEvent<Consent>).detail);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

/** Otwiera ponownie baner cookies (link „Ustawienia cookies”). */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function onConsentSettingsOpen(cb: () => void): () => void {
  window.addEventListener(OPEN_EVENT, cb);
  return () => window.removeEventListener(OPEN_EVENT, cb);
}
