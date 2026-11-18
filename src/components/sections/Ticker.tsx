import { services } from '@/content/services';
import './Ticker.css';

const ITEMS = [
  'Skrzynie biegów',
  'Silniki',
  'Elektryka',
  'Wymiana filtrów',
  'Klimatyzacja',
  'Układy hamulcowe',
  'Wulkanizacja',
  'Naprawy bieżące',
];

export function Ticker() {
  // Dwie identyczne połówki = płynna pętla bez przeskoku.
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker" aria-label={`Zakres usług: ${services.map((s) => s.title).join(', ')}`}>
      <div className="ticker__track" aria-hidden="true">
        {loop.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
