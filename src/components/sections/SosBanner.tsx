import { CarBattery, Phone } from 'lucide-react';
import { links } from '@/content/company';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import './SosBanner.css';

export function SosBanner() {
  return (
    <section className="sos" aria-label="Pomoc przy awarii">
      <div className="wrap">
        <Reveal className="sos__box">
          <div className="sos__ico" aria-hidden="true">
            <CarBattery />
          </div>
          <div>
            <h3>Auto nie odpala?</h3>
            <p>
              Rozładowany akumulator albo nagła awaria — zadzwoń. Pomożemy uruchomić samochód i znajdziemy
              przyczynę.
            </p>
          </div>
          <Button href={links.tel} icon={<Phone aria-hidden="true" />}>
            Dzwoń teraz
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
