import { ArrowRight } from 'lucide-react';
import { services } from '@/content/services';
import { pad2 } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { ServiceIcon } from '@/components/icons/ServiceIcon';
import './ServicesGrid.css';

export function ServicesGrid() {
  return (
    <section className="sec" id="uslugi" aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead
          label="Zakres usług"
          title={
            <span id="services-title">
              Robimy <em>wszystko</em>,<br />
              co jeździ.
            </span>
          }
          lead="Pełna mechanika pojazdowa pod jednym dachem. Diagnozujemy komputerowo, mówimy wprost co trzeba zrobić i ile to kosztuje — zanim weźmiemy się do roboty."
        />
        <div className="svc-grid">
          {services.map((s, i) => {
            const num = pad2(i + 1);
            return (
              <Reveal
                as="article"
                key={s.id}
                delay={(i % 4) as 0 | 1 | 2 | 3}
                className={`svc${s.featured ? ' svc--photo island' : ''}`}
              >
                {s.featured && (
                  <div className="svc__img">
                    <Photo n={s.photo.n} alt={s.photo.alt} width={1000} />
                  </div>
                )}
                <span className="svc__num">{num}</span>
                {!s.featured && (
                  <div className="svc__ico">
                    <ServiceIcon name={s.icon} />
                  </div>
                )}
                <h3>{s.title}</h3>
                <p>{s.teaser}</p>
                {s.featured && s.chips.length > 0 && (
                  <ul className="chips">
                    {s.chips.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                )}
                {!s.featured && (
                  <span className="svc__bg-num" aria-hidden="true">
                    {num}
                  </span>
                )}
              </Reveal>
            );
          })}
        </div>
        <Reveal className="svc-more">
          <Button to="/uslugi" variant="ghost">
            Pełna lista usług <ArrowRight aria-hidden="true" />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
