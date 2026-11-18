import { Phone } from 'lucide-react';
import { links } from '@/content/company';
import { tyreServices } from '@/content/services';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { Wheel } from './Wheel';
import './Tyres.css';

export function Tyres() {
  return (
    <section className="tyres" id="opony" aria-labelledby="tyres-title">
      <div className="hazard" aria-hidden="true" />
      <div className="sec">
        <div className="wrap tyres__grid">
          <Reveal className="tyres__visual">
            <Wheel />
            <div className="tyres__tag">
              Sezon
              <br />
              na zimówki<small>wymiana · wyważanie</small>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <span className="label">Wulkanizacja</span>
            <h2 id="tyres-title">
              Opony?
              <br />
              <em>Zmieniamy.</em>
            </h2>
            <p className="lead tyres__lead">
              Wymiana i wyważanie kół bez kombinowania. Przy okazji rzucimy okiem na hamulce i zawieszenie —
              powiemy, jeśli coś się kończy.
            </p>
            <ul className="tyres__list">
              {tyreServices.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <Button href={links.tel} icon={<Phone aria-hidden="true" />}>
              Umów wymianę opon
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
