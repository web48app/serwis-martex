import { ArrowRight, Phone } from 'lucide-react';
import { company, links } from '@/content/company';
import { Seo } from '@/seo/Seo';
import { Button } from '@/components/ui/Button';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <Seo
        title={`Nie ma takiej strony — ${company.name}`}
        description="Ta strona nie istnieje."
        path="/404"
        noindex
      />
      <section className="nf">
        <div className="wrap">
          <span className="label">Błąd 404</span>
          <h1>
            Zjechałeś
            <br />z <em>trasy</em>.
          </h1>
          <p className="lead">
            Tej strony nie ma — może adres się zmienił. Wróć na start albo po prostu zadzwoń.
          </p>
          <div className="nf__btns">
            <Button to="/">
              Strona główna <ArrowRight aria-hidden="true" />
            </Button>
            <Button href={links.tel} variant="ghost" icon={<Phone aria-hidden="true" />}>
              {company.phone.display}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
