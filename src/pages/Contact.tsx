import { useState } from 'react';
import { Check, Copy, MessageSquare, Navigation, Phone } from 'lucide-react';
import { company, links } from '@/content/company';
import { contactFaq } from '@/content/faq';
import type { Photo as PhotoT } from '@/content/types';
import { Seo } from '@/seo/Seo';
import { Button } from '@/components/ui/Button';
import { OpenStatus } from '@/components/ui/OpenStatus';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';
import { PageHero } from '@/components/sections/PageHero';
import { HoursTable } from '@/components/sections/HoursTable';
import { MapEmbed } from '@/components/sections/MapEmbed';
import { Gallery } from '@/components/sections/Gallery';
import { Faq } from '@/components/sections/Faq';
import './Contact.css';

const WORKSHOP: PhotoT[] = [
  { n: 4, alt: 'Hala warsztatu z podnośnikami' },
  { n: 3, alt: 'Stanowisko z podnośnikiem' },
  { n: 9, alt: 'Auto klienta w warsztacie' },
  { n: 7, alt: 'Samochód na podnośniku' },
];

function CopyButton({ text, label }: { text: string; label: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setDone(true);
      window.setTimeout(() => setDone(false), 2000);
    } catch {
      window.prompt('Skopiuj:', text);
    }
  };
  return (
    <button type="button" className={`copy${done ? ' done' : ''}`} onClick={copy}>
      {done ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
      {done ? 'Skopiowano' : label}
    </button>
  );
}

export default function Contact() {
  const navAddress = `${company.address.streetShort}, ${company.address.postalCode} ${company.address.city}`;
  const gps = `${company.geo.lat}, ${company.geo.lng.toFixed(5)}`;
  return (
    <>
      <Seo
        title={`Kontakt i dojazd — ${company.name} Tarnów`}
        description={`${company.name}, ${company.address.street}, ${company.address.postalCode} ${company.address.city}. Tel. ${company.phone.display}. Pn–Pt 8:00–17:00, sobota 8:00–14:00. Mapa i dojazd.`}
        path="/kontakt"
        crumb="Kontakt"
      />
      <PageHero
        photo={3}
        crumb="Kontakt"
        title={['Kontakt', 'i dojazd.']}
        lead="Najszybciej umówisz się telefonicznie. Drobne rzeczy — olej, klocki, żarówki — często robimy od ręki."
      />

      <section className="sec sec--alt">
        <div className="wrap contact__grid">
          <Reveal className="cbox">
            <div className="crow">
              <span className="label">Telefon</span>
              <a className="cbig" href={links.tel}>
                {company.phone.display}
              </a>
              <div className="cbtns">
                <Button href={links.tel} size="sm" icon={<Phone aria-hidden="true" />}>
                  Zadzwoń
                </Button>
                <Button
                  href={links.sms}
                  size="sm"
                  variant="ghost"
                  icon={<MessageSquare aria-hidden="true" />}
                >
                  Napisz SMS
                </Button>
              </div>
            </div>
            <div className="crow">
              <span className="label">Adres</span>
              <address>
                {company.name}
                <br />
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </address>
            </div>
            <div className="crow crow--last">
              <span className="label">Godziny otwarcia</span>
              <OpenStatus className="crow__status" />
              <HoursTable />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <MapEmbed id="dojazd" />
          </Reveal>
        </div>
      </section>

      <section className="sec" aria-labelledby="route-title">
        <div className="wrap">
          <SectionHead
            label="Dojazd"
            title={
              <span id="route-title">
                Jak do nas
                <br />
                <em>trafić</em>.
              </span>
            }
            lead="Wpisz adres w nawigację albo kliknij jedną z aplikacji poniżej — poprowadzi Cię pod same drzwi warsztatu."
          />
          <div className="rgrid">
            <Reveal className="rcardx">
              <span className="rcardx__n" aria-hidden="true">
                A
              </span>
              <h3>Adres do nawigacji</h3>
              <p className="mono">
                {company.address.street}
                <br />
                {company.address.postalCode} {company.address.city}
              </p>
              <CopyButton text={navAddress} label="Kopiuj adres" />
            </Reveal>
            <Reveal delay={1} className="rcardx">
              <span className="rcardx__n" aria-hidden="true">
                GPS
              </span>
              <h3>Współrzędne</h3>
              <p className="mono">
                {gps}
                <br />
                Plus Code: {company.geo.plusCode}
              </p>
              <CopyButton text={gps} label="Kopiuj GPS" />
            </Reveal>
            <Reveal delay={2} className="rcardx">
              <span className="rcardx__n" aria-hidden="true">
                →
              </span>
              <h3>Otwórz w aplikacji</h3>
              <div className="apps">
                <a href={links.directions} target="_blank" rel="noopener" className="app">
                  <Navigation aria-hidden="true" /> Google Maps
                </a>
                <a href={links.waze} target="_blank" rel="noopener" className="app">
                  <Navigation aria-hidden="true" /> Waze
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="sec sec--alt" aria-labelledby="place-title">
        <div className="wrap">
          <SectionHead
            label="Na miejscu"
            title={
              <span id="place-title">
                Tak wygląda
                <br />
                <em>warsztat</em>.
              </span>
            }
            lead="Siedem stanowisk, podnośniki i diagnostyka komputerowa. Tu trafi Twoje auto."
          />
          <Reveal>
            <Gallery photos={WORKSHOP} layout="grid" />
          </Reveal>
        </div>
      </section>

      <Faq
        label="Dobrze wiedzieć"
        title={
          <>
            Zanim
            <br />
            <em>przyjedziesz</em>.
          </>
        }
        items={contactFaq}
        aside={
          <>
            <p className="lead faq-aside">
              Nie ma tu odpowiedzi? Zadzwoń — szybciej wyjaśnimy przez telefon.
            </p>
            <Button href={links.tel} icon={<Phone aria-hidden="true" />} className="faq-aside__btn">
              {company.phone.display}
            </Button>
          </>
        }
      />
    </>
  );
}
