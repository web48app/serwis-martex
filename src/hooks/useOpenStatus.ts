import { useEffect, useState } from 'react';
import { hours } from '@/content/company';
import { getOpenStatus, nowInZone, type OpenStatus } from '@/lib/openingHours';
import type { Weekday } from '@/content/types';

export interface LiveStatus extends OpenStatus {
  today: Weekday;
}

/**
 * Status liczony dopiero w przeglądarce (strona jest prerenderowana, więc godzina z builda byłaby błędna).
 * Przed hydracją zwraca `null` — komponent pokazuje wtedy same godziny.
 */
export function useOpenStatus(): LiveStatus | null {
  const [status, setStatus] = useState<LiveStatus | null>(null);
  useEffect(() => {
    const tick = () => {
      const now = nowInZone();
      setStatus({ ...getOpenStatus(hours, now), today: now.weekday });
    };
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return status;
}
