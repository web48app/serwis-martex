import { useEffect, useState } from 'react';
import { onConsentChange, readConsent, type Consent } from '@/lib/consent';

/** `undefined` = jeszcze nie wiadomo (SSR / przed hydracją), `null` = brak decyzji. */
export function useConsent(): Consent | null | undefined {
  const [consent, setConsent] = useState<Consent | null | undefined>(undefined);
  useEffect(() => {
    setConsent(readConsent());
    return onConsentChange(setConsent);
  }, []);
  return consent;
}
