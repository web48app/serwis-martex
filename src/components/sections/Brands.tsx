import { brands } from '@/content/services';
import './Brands.css';

export function Brands() {
  const all = [...brands[0], ...brands[1]];
  return (
    <section className="brands" aria-label={`Obsługiwane marki: ${all.join(', ')} i inne`}>
      {brands.map((row, r) => (
        <div key={r} className={`brands__row${r ? ' rev' : ''}`} aria-hidden="true">
          {[...row, ...row].map((b, i) => (
            <span key={i}>{b}</span>
          ))}
        </div>
      ))}
      <p className="brands__note">
        <b>Nie ma Twojej marki?</b> Spokojnie — naprawiamy wszystkie.
      </p>
    </section>
  );
}
