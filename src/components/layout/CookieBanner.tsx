import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { onConsentSettingsOpen, readConsent, saveConsent, type Consent } from '@/lib/consent';
import './CookieBanner.css';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = readConsent() ? undefined : window.setTimeout(() => setVisible(true), 900);
    const off = onConsentSettingsOpen(() => setVisible(true));
    return () => {
      window.clearTimeout(timer);
      off();
    };
  }, []);

  const choose = (value: Consent) => {
    saveConsent(value);
    setVisible(false);
  };

  return (
    <div
      className={`cookies${visible ? ' show' : ''}`}
      role="dialog"
      aria-label="Pliki cookies"
      aria-hidden={!visible}
    >
      <b>Ciasteczka 🍪</b>
      <p>
        Strona zapamiętuje Twoje wybory (np. jasny/ciemny motyw) w przeglądarce. Za Twoją zgodą wczytamy też
        mapę Google, która zapisuje własne pliki cookies. Więcej w{' '}
        <Link to="/polityka-prywatnosci" tabIndex={visible ? 0 : -1}>
          polityce prywatności
        </Link>
        .
      </p>
      <div className="cookies__btns">
        <Button onClick={() => choose('all')} size="sm">
          Akceptuję
        </Button>
        <Button onClick={() => choose('necessary')} variant="ghost" size="sm">
          Tylko niezbędne
        </Button>
      </div>
    </div>
  );
}
