import { Phone } from 'lucide-react';
import { company, links } from '@/content/company';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import './CtaBand.css';

export function CtaBand() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <Reveal className="wrap">
        <span className="label">Coś stuka, piszczy, świeci?</span>
        <h2 id="cta-title">
          Nie czekaj,
          <br />
          aż <em>stanie</em>.
        </h2>
        <p>Im wcześniej przyjedziesz, tym taniej wyjdzie. Zadzwoń — powiemy, kiedy możemy przyjąć auto.</p>
        <Button href={links.tel} icon={<Phone aria-hidden="true" />}>
          {company.phone.display}
        </Button>
      </Reveal>
    </section>
  );
}
