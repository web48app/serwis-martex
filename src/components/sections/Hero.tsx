import { ArrowRight, Phone } from 'lucide-react';
import { company, hours, links } from '@/content/company';
import { formatHour } from '@/lib/openingHours';
import { formatRating } from '@/lib/format';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import './Hero.css';

export function Hero() {
  const { rating, count } = useGoogleReviews();
  const wk = hours[1];
  const sat = hours[6];
  return (
    <section className="hero island" aria-labelledby="hero-title">
      <div className="hero__bg">
        <Photo n={4} alt="Warsztat Martex — samochody na podnośnikach" priority />
      </div>
      <div className="hero__slash" aria-hidden="true" />
      <div className="wrap hero__inner">
        <span className="label">Serwis samochodowy · {company.address.city}</span>
        <h1 id="hero-title">
          <span className="line">
            <span>Naprawimy</span>
          </span>
          <span className="line">
            <span className="outline">każde</span>
          </span>
          <span className="line">
            <span className="accent">auto.</span>
          </span>
        </h1>
        <p className="hero__sub">
          Od wymiany oleju po <b>remont silnika i skrzyni biegów</b>. Elektryka, klimatyzacja, hamulce,
          wulkanizacja — wszystko w jednym miejscu. <b>{company.stations} stanowisk</b>, więc szybkie usługi
          robimy często od ręki.
        </p>
        <div className="hero__ctas">
          <Button href={links.tel} icon={<Phone aria-hidden="true" />}>
            Zadzwoń {company.phone.display}
          </Button>
          <Button to="/uslugi" variant="ghost">
            Zobacz usługi <ArrowRight aria-hidden="true" />
          </Button>
        </div>
        <div className="hero__meta">
          <a className="gbadge" href={links.googleProfile} target="_blank" rel="noopener">
            <span className="gbadge__g">
              <GoogleIcon />
            </span>
            <span>
              <strong>{formatRating(rating)}</strong> <span className="stars">★★★★★</span>
              <small>{count} opinii w Google</small>
            </span>
          </a>
          {wk && (
            <div className="hero__fact">
              <b>
                Pn–Pt {formatHour(wk.open).replace(':00', '')}–{formatHour(wk.close).replace(':00', '')}
              </b>
              {sat &&
                `Sobota ${formatHour(sat.open).replace(':00', '')}–${formatHour(sat.close).replace(':00', '')}`}
            </div>
          )}
          <div className="hero__fact">
            <b>Wszystkie marki</b>osobowe i dostawcze
          </div>
        </div>
      </div>
      <div className="hero__side" aria-hidden="true">
        {company.address.streetShort} · {company.address.postalCode} {company.address.city}
      </div>
      <span className="scrolldown" aria-hidden="true" />
    </section>
  );
}
