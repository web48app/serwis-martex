import { Link } from 'react-router-dom';
import { company, fullAddress, hours, links } from '@/content/company';
import { navigation } from '@/content/navigation';
import { formatHour } from '@/lib/openingHours';
import { openConsentSettings } from '@/lib/consent';
import './Footer.css';

export function Footer() {
  const wk = hours[1];
  const sat = hours[6];
  return (
    <footer className="foot island">
      <div className="wrap">
        <div className="foot__grid">
          <div>
            <img
              src="/img/logo.png"
              alt="Grupa Martex"
              width={263}
              height={155}
              className="foot__logo"
              loading="lazy"
            />
            <p>Serwis samochodowy w Tarnowie. Naprawa wszystkich marek samochodów osobowych i dostawczych.</p>
            <p className="foot__company">
              {company.legalName}
              <br />
              {fullAddress}
              {company.nip && (
                <>
                  <br />
                  NIP: {company.nip}
                </>
              )}
              {company.regon && (
                <>
                  <br />
                  REGON: {company.regon}
                </>
              )}
            </p>
          </div>
          <nav aria-label="Strona">
            <h4>Strona</h4>
            <ul>
              {navigation
                .filter((n) => n.inFooter)
                .map((n) => (
                  <li key={n.label}>
                    <Link to={n.to}>{n.label}</Link>
                  </li>
                ))}
            </ul>
          </nav>
          <div>
            <h4>Godziny</h4>
            <ul>
              {wk && (
                <li>
                  Pn–Pt: {formatHour(wk.open)}–{formatHour(wk.close)}
                </li>
              )}
              {sat && (
                <li>
                  Sobota: {formatHour(sat.open)}–{formatHour(sat.close)}
                </li>
              )}
              <li>Niedziela: nieczynne</li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul>
              <li>
                <a href={links.tel}>{company.phone.display}</a>
              </li>
              <li>{company.address.street}</li>
              <li>
                {company.address.postalCode} {company.address.city}
              </li>
              <li>
                <a href={links.googleProfile} target="_blank" rel="noopener">
                  Wizytówka Google →
                </a>
              </li>
              <li>
                <a href={links.googleWriteReview} target="_blank" rel="noopener">
                  ★ Wystaw opinię
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot__bottom">
          <span>
            © {new Date().getFullYear()} {company.name} · {company.address.city}
          </span>
          <span className="foot__legal">
            <Link to="/polityka-prywatnosci">Polityka prywatności i cookies</Link>
            <button type="button" onClick={openConsentSettings}>
              Ustawienia cookies
            </button>
          </span>
          <span>
            Projekt i wykonanie:{' '}
            <a href={links.author} target="_blank" rel="noopener">
              web48.app
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
