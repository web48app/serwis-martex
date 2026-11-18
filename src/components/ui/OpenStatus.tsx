import { hours } from '@/content/company';
import { useOpenStatus } from '@/hooks/useOpenStatus';
import { summarizeHours } from '@/lib/openingHours';
import './OpenStatus.css';

/** Kropka + „Otwarte teraz · do 17:00”. Przed hydracją pokazuje same godziny otwarcia. */
export function OpenStatus({ className = '' }: { className?: string }) {
  const status = useOpenStatus();
  const state = status ? (status.open ? ' is-open' : ' is-closed') : '';
  return (
    <span className={`status${state} ${className}`.trim()} aria-live="polite">
      <i aria-hidden="true" />
      <span>{status ? status.label : summarizeHours(hours)}</span>
    </span>
  );
}
