import { Info, Phone } from 'lucide-react';
import { company, links } from '@/content/company';
import { PRICING_PUBLIC } from '@/content/navigation';
import { individualQuotes, priceCategories, pricingFaq } from '@/content/pricing';
import { formatPrice, pad2 } from '@/lib/format';
import { Seo } from '@/seo/Seo';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { PageHero } from '@/components/sections/PageHero';
import { Faq } from '@/components/sections/Faq';
import { CtaBand } from '@/components/sections/CtaBand';
import './Pricing.css';

export default function Pricing() {
  return (
    <>
      <Seo
        title={`Cennik — ${company.name} Tarnów`}
        description={`Orientacyjny cennik ${company.name} w Tarnowie: wymiana opon, olej, hamulce, klimatyzacja, diagnostyka. Większe naprawy wyceniamy indywidualnie.`}
        path="/cennik"
        crumb="Cennik"
        noindex={!PRICING_PUBLIC}
      />
      <PageHero
        photo={8}
        crumb="Cennik"
        title={['Cennik', 'bez niespodzianek.']}
        lead="Ceny wyjściowe najczęstszych usług. Większe naprawy wyceniamy indywidualnie — zawsze przed rozpoczęciem pracy."
      />

      <section className="sec">
        <div className="wrap">
          <Reveal className="pnote" role="note">
            <span className="pnote__ico" aria-hidden="true">
              <Info />
            </span>
            <p>
              <b>Ceny orientacyjne robocizny (brutto).</b> Części i materiały liczone osobno. Dokładny koszt
              zależy od modelu auta i stanu podzespołów — podamy go po oględzinach albo przez telefon, gdy
              podasz markę, model i rocznik.
            </p>
          </Reveal>
          <div className="pgrid">
            {priceCategories.map((cat, i) => (
              <Reveal
                as="article"
                key={cat.id}
                delay={(i % 2) as 0 | 1}
                className="pcat"
                aria-labelledby={`p-${cat.id}`}
              >
                <header>
                  <span>{pad2(i + 1)}</span>
                  <h2 id={`p-${cat.id}`}>{cat.title}</h2>
                </header>
                <ul className="plist">
                  {cat.items.map((item) => {
                    const p = formatPrice(item);
                    return (
                      <li key={item.name}>
                        <span>{item.name}</span>
                        <b>
                          {p.amount} {p.unit && <small>{p.unit}</small>}
                        </b>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-labelledby="indiv-title">
        <div className="wrap">
          <SectionHead
            label="Wycena indywidualna"
            title={
              <span id="indiv-title">
                Tu cena
                <br />
                zależy od <em>auta</em>.
              </span>
            }
            lead="Przy większych naprawach koszt robocizny i części mocno różni się między modelami. Zadzwoń z marką, modelem i rocznikiem — podamy konkretną kwotę, zanim zaczniemy."
          />
          <ul className="igrid">
            {individualQuotes.map((q, i) => (
              <Reveal as="li" key={q.title} delay={(i % 4) as 0 | 1 | 2 | 3} className="icard">
                <b>{q.title}</b>
                <span>{q.text}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal className="revcta pricing-cta">
            <p>
              <b>Masz konkretną usterkę?</b> Zadzwoń — powiemy, ile to mniej więcej wyjdzie.
            </p>
            <Button href={links.tel} icon={<Phone aria-hidden="true" />}>
              {company.phone.display}
            </Button>
          </Reveal>
        </div>
      </section>

      <Faq
        label="Cennik — pytania"
        title={
          <>
            Dobrze
            <br />
            <em>wiedzieć</em>.
          </>
        }
        items={pricingFaq}
      />
      <CtaBand />
    </>
  );
}
