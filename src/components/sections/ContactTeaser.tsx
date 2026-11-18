import { ArrowRight } from 'lucide-react';
import { company, fullAddress, hours, links } from '@/content/company';
import { summarizeHours } from '@/lib/openingHours';
import { Button } from '@/components/ui/Button';
import { OpenStatus } from '@/components/ui/OpenStatus';
import { Reveal } from '@/components/ui/Reveal';
import './ContactTeaser.css';

export function ContactTeaser() {
  return (
    <section className="sec sec--alt" aria-labelledby="contact-teaser-title">
      <div className="wrap">
        <Reveal className="kteaser">
          <div>
            <span className="label">Kontakt</span>
            <h2 id="contact-teaser-title">
              Wpadaj
              <br />
              albo <em>dzwoń</em>.
            </h2>
          </div>
          <div className="kteaser__info">
            <a className="cbig" href={links.tel}>
              {company.phone.display}
            </a>
            <OpenStatus className="kteaser__status" />
            <address>
              {fullAddress}
              <br />
              {summarizeHours(hours)}
            </address>
            <div className="kteaser__btns">
              <Button to="/kontakt">
                Kontakt i dojazd <ArrowRight aria-hidden="true" />
              </Button>
              <Button href={links.directions} external variant="ghost">
                Wyznacz trasę
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
