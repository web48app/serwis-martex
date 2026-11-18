import { company } from '@/content/company';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import { useInView } from '@/hooks/useInView';
import { useCountUp } from '@/hooks/useCountUp';
import './Stats.css';

function Stat({
  value,
  decimals = 0,
  sup,
  label,
}: {
  value: number;
  decimals?: number;
  sup?: string;
  label: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const shown = useCountUp(value, inView, decimals);
  return (
    <div ref={ref} className={`stat${inView ? ' in' : ''}`}>
      <b>
        <span>{shown}</span>
        {sup && <sup>{sup}</sup>}
      </b>
      <span>{label}</span>
    </div>
  );
}

export function Stats({ className = '' }: { className?: string }) {
  const { rating, count } = useGoogleReviews();
  return (
    <section className={`stats ${className}`.trim()} aria-label="Serwis w liczbach">
      <div className="wrap">
        <div className="stats__grid">
          <Stat value={rating} decimals={1} sup="★" label="średnia ocena Google" />
          <Stat value={count} sup="+" label="opinii klientów" />
          <Stat value={company.stations} label="stanowisk naprawczych" />
          <Stat value={company.brandsCount} sup="+" label="obsługiwanych marek" />
        </div>
      </div>
    </section>
  );
}
