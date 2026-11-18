import { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { company, links } from '@/content/company';
import { useConsent } from '@/hooks/useConsent';
import { Button } from '@/components/ui/Button';
import './MapEmbed.css';

/** Mapa Google wczytywana dopiero po zgodzie na cookies albo po kliknięciu „Pokaż mapę”. */
export function MapEmbed({ id }: { id?: string }) {
  const consent = useConsent();
  const [manual, setManual] = useState(false);
  const loaded = consent === 'all' || manual;

  return (
    <div className="map" id={id}>
      {loaded ? (
        <iframe
          src={links.mapEmbed}
          title={`Mapa dojazdu — ${company.name}`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="map__consent">
          <MapPin aria-hidden="true" />
          <p>Mapa Google zapisuje własne pliki cookies, dlatego wczytujemy ją dopiero po Twojej zgodzie.</p>
          <Button onClick={() => setManual(true)} size="sm">
            Pokaż mapę
          </Button>
        </div>
      )}
      <div className="map__pin island">
        <div>
          <b>Serwis {company.shortName}</b>
          <small>
            {company.address.streetShort}, {company.address.city}
          </small>
        </div>
        <Button href={links.directions} external size="sm">
          Wyznacz trasę <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
