import { ArrowRight } from 'lucide-react';
import { company } from '@/content/company';
import { values } from '@/content/faq';
import type { Photo as PhotoT } from '@/content/types';
import { pad2 } from '@/lib/format';
import { Seo } from '@/seo/Seo';
import { Button } from '@/components/ui/Button';
import { Photo } from '@/components/ui/Photo';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { Stars } from '@/components/ui/Stars';
import { PageHero } from '@/components/sections/PageHero';
import { Stats } from '@/components/sections/Stats';
import { Gallery } from '@/components/sections/Gallery';
import { CtaBand } from '@/components/sections/CtaBand';
import './About.css';

const COLLAGE: PhotoT[] = [
  { n: 4, alt: 'Hala warsztatu Martex z podnośnikami' },
  { n: 9, alt: 'BMW w warsztacie Martex' },
  { n: 1, alt: 'Naprawa silnika' },
];
const STRIP: PhotoT[] = [
  { n: 3, alt: 'Dostawczak na podnośniku' },
  { n: 7, alt: 'Auto na podnośniku' },
  { n: 5, alt: 'Diagnostyka elektryki' },
  { n: 10, alt: 'Naprawa skrzyni biegów' },
  { n: 2, alt: 'Serwis hamulców' },
];

export default function About() {
  return (
    <>
      <Seo
        title={`O firmie — ${company.name} Tarnów`}
        description={`${company.name} z Tarnowa: ${company.stations} stanowisk, pełna mechanika, wszystkie marki. Rzetelna diagnoza, jasna wycena i naprawy w terminie.`}
        path="/o-firmie"
        crumb="O firmie"
      />
      <PageHero
        photo={4}
        crumb="O firmie"
        title={['Serwis, do którego', 'się wraca.']}
        lead={`Warsztat przy ${company.address.street} w Tarnowie. Siedem stanowisk, pełna mechanika i ludzie, którzy mówią wprost.`}
      />

      <section className="sec">
        <div className="wrap about">
          <Reveal className="about__txt">
            <span className="label">Kim jesteśmy</span>
            <h2>
              Pełna
              <br />
              <em>mechanika</em>.
              <br />
              Jeden adres.
            </h2>
            <p className="big">
              {company.name} to warsztat w Tarnowie przy {company.address.street}. Naprawiamy samochody
              osobowe i dostawcze wszystkich marek — od wymiany oleju po remont silnika czy skrzyni biegów.
            </p>
            <p>
              Mamy <b>{company.stations} stanowisk</b>, dlatego szybkie rzeczy — olej, klocki, filtry, żarówki
              — często robimy od ręki, a większe naprawy w umówionym terminie. Do każdego auta podchodzimy jak
              do własnego: najpierw rzetelna diagnoza, potem jasna informacja co i za ile, a dopiero na końcu
              klucze w ruch.
            </p>
            <p>Klienci do nas wracają — często już z kolejnym autem.</p>
            <div className="about__btns">
              <Button to="/uslugi">
                Zobacz usługi <ArrowRight aria-hidden="true" />
              </Button>
              <Button to="/kontakt" variant="ghost">
                Kontakt i dojazd
              </Button>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <Gallery
              photos={COLLAGE}
              render={(open) => (
                <div className="about__pics">
                  {COLLAGE.map((p, i) => (
                    <button
                      key={p.n}
                      type="button"
                      className={`gal__item about__pic${i === 0 ? ' about__pic--tall' : ''}`}
                      onClick={() => open(i)}
                      aria-label={`Powiększ: ${p.alt}`}
                    >
                      <Photo n={p.n} alt={p.alt} width={900} />
                    </button>
                  ))}
                  <div className="about__badge">
                    <b>{company.stations}</b>
                    <span>
                      stanowisk
                      <br />
                      naprawczych
                    </span>
                  </div>
                </div>
              )}
            />
          </Reveal>
        </div>
      </section>

      <Stats className="stats--flush" />

      <section className="sec" aria-labelledby="values-title">
        <div className="wrap">
          <SectionHead
            label="Jak działamy"
            title={
              <span id="values-title">
                Cztery
                <br />
                <em>zasady</em>.
              </span>
            }
            lead="Nic odkrywczego — po prostu robimy to konsekwentnie przy każdym aucie."
          />
          <ul className="values">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={(i % 4) as 0 | 1 | 2 | 3} className="value">
                <span aria-hidden="true">{pad2(i + 1)}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="quote" aria-label="Opinia klienta">
        <Reveal as="figure" className="wrap">
          <span className="quote__mark" aria-hidden="true">
            “
          </span>
          <blockquote>
            Mechanicy zwracają uwagę na ogólny stan techniczny samochodu i z wyprzedzeniem informują o zużyciu
            innych części.
          </blockquote>
          <figcaption className="quote__by">
            Artur B. · opinia w Google · <Stars value={5} />
          </figcaption>
          <Button to="/#opinie" variant="ghost">
            Więcej opinii <ArrowRight aria-hidden="true" />
          </Button>
        </Reveal>
      </section>

      <section className="sec sec--alt" aria-labelledby="workshop-title">
        <div className="wrap">
          <SectionHead
            label="Warsztat"
            title={
              <span id="workshop-title">
                Tak u nas
                <br />
                <em>wygląda</em>.
              </span>
            }
            lead="Podnośniki, diagnostyka, części na stole — codzienna robota bez retuszu."
          />
          <Reveal>
            <Gallery photos={STRIP} layout="strip" />
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
