import { useEffect, useState } from 'react';
import { company } from '@/content/company';
import { extras, services } from '@/content/services';
import type { HeadingPart } from '@/content/types';
import { pad2 } from '@/lib/format';
import { Seo } from '@/seo/Seo';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import './Services.css';

const SUBNAV = [
  ...services.map((s) => ({ id: s.id, label: s.navLabel ?? s.title })),
  { id: 'dodatkowo', label: 'Dodatkowo' },
];
const IDS = SUBNAV.map((s) => s.id);

function Heading({ parts }: { parts: HeadingPart[] }) {
  return (
    <>
      {parts.map((p, i) =>
        typeof p === 'string' ? p : 'em' in p ? <em key={i}>{p.em}</em> : <br key={i} />,
      )}
    </>
  );
}

/** Która sekcja jest teraz na środku ekranu — do podświetlenia w pasku kategorii. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export default function Services() {
  const active = useActiveSection(IDS);

  useEffect(() => {
    if (!active) return;
    document
      .querySelector(`.subnav a[href="#${active}"]`)
      ?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [active]);

  return (
    <>
      <Seo
        title={`Usługi — ${company.name} Tarnów`}
        description="Pełna mechanika pojazdowa w Tarnowie: skrzynie biegów, silniki, elektryka i diagnostyka, filtry i przeglądy, klimatyzacja, hamulce, wulkanizacja, zawieszenie i wydech. Wszystkie marki."
        path="/uslugi"
        crumb="Usługi"
      />
      <PageHero
        photo={10}
        crumb="Usługi"
        title={['Usługi', 'od A do Z.']}
        lead="Osobówki i dostawczaki, wszystkie marki. Poniżej pełna lista tego, co robimy na co dzień — a jeśli czegoś nie ma, i tak zadzwoń."
      />

      <nav className="subnav" aria-label="Kategorie usług">
        <div className="wrap subnav__inner">
          {SUBNAV.map((s) => (
            <a key={s.id} href={`#${s.id}`} className={active === s.id ? 'on' : undefined}>
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="srows">
        <div className="wrap">
          {services.map((s, i) => (
            <Reveal as="article" key={s.id} id={s.id} className={`srow${i % 2 ? ' srow--rev' : ''}`}>
              <div className="srow__img">
                <Photo n={s.photo.n} alt={s.photo.alt} width={1200} />
                <span className="srow__num" aria-hidden="true">
                  {pad2(i + 1)}
                </span>
              </div>
              <div className="srow__txt">
                <span className="label">{s.label}</span>
                <h2>
                  <Heading parts={s.heading} />
                </h2>
                <p>{s.description}</p>
                <ul className="checks">
                  {s.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="sec sec--alt" id="dodatkowo" aria-labelledby="extras-title">
        <div className="wrap">
          <SectionHead
            label="I jeszcze"
            title={
              <span id="extras-title">
                To też
                <br />
                <em>zrobimy</em>.
              </span>
            }
            lead="Rzeczy, o które klienci pytają najczęściej, a których nie widać w nazwie warsztatu."
          />
          <div className="xgrid">
            {extras.map((x, i) => (
              <Reveal key={x.title} delay={(i % 4) as 0 | 1 | 2 | 3} className="xcard">
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
