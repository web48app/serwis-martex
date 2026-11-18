import { company } from '@/content/company';
import { homeGallery } from '@/content/photos';
import { Seo } from '@/seo/Seo';
import { SectionHead } from '@/components/ui/SectionHead';
import { Reveal } from '@/components/ui/Reveal';
import { Hero } from '@/components/sections/Hero';
import { Ticker } from '@/components/sections/Ticker';
import { Stats } from '@/components/sections/Stats';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { Tyres } from '@/components/sections/Tyres';
import { SosBanner } from '@/components/sections/SosBanner';
import { Process } from '@/components/sections/Process';
import { Gallery } from '@/components/sections/Gallery';
import { Brands } from '@/components/sections/Brands';
import { Reviews } from '@/components/sections/Reviews';
import { ContactTeaser } from '@/components/sections/ContactTeaser';
import { CtaBand } from '@/components/sections/CtaBand';

export default function Home() {
  return (
    <>
      <Seo
        title={`${company.name} Tarnów — mechanik, wulkanizacja, klimatyzacja`}
        description={`Serwis samochodowy Martex w Tarnowie (${company.address.street}). Naprawa wszystkich marek: silniki, skrzynie biegów, elektryka, hamulce, klimatyzacja, wymiana opon i wyważanie. Tel. ${company.phone.display}.`}
        path="/"
      />
      <Hero />
      <Ticker />
      <Stats />
      <ServicesGrid />
      <Tyres />
      <SosBanner />
      <Process />
      <section className="sec sec--alt" id="realizacje" aria-labelledby="gallery-title">
        <div className="wrap">
          <SectionHead
            label="Z warsztatu"
            title={
              <span id="gallery-title">
                Prosto
                <br />z <em>kanału</em>.
              </span>
            }
            lead="Silniki, skrzynie, elektryka, zawieszenie — tak wygląda codzienna robota na naszych stanowiskach."
          />
          <Reveal>
            <Gallery photos={homeGallery} layout="mosaic" />
          </Reveal>
        </div>
      </section>
      <Brands />
      <Reviews />
      <ContactTeaser />
      <CtaBand />
    </>
  );
}
