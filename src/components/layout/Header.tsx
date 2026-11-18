import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone } from 'lucide-react';
import { company, links } from '@/content/company';
import { navigation } from '@/content/navigation';
import { useScrolled } from '@/hooks/useScrolled';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

export function Header() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const scrolled = useScrolled(30);

  useEffect(() => setOpen(false), [pathname, hash]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (to: string) =>
    !to.includes('#') && (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap nav__inner">
        <Link to="/" className="nav__logo" aria-label={`${company.shortName} — strona główna`}>
          <img src="/img/logo.png" alt={`${company.shortName} grupa`} width={263} height={155} />
        </Link>

        <nav id="main-nav" className="nav__links" aria-label="Menu główne">
          {navigation
            .filter((n) => n.inNav)
            .map((n) => (
              <Link
                key={n.to + n.label}
                to={n.to}
                className={isActive(n.to) ? 'active' : undefined}
                aria-current={isActive(n.to) ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
        </nav>

        <div className="nav__right">
          <ThemeToggle />
          <Button href={links.tel} className="nav__cta" size="sm" icon={<Phone aria-hidden="true" />}>
            {company.phone.display}
          </Button>
          <button
            type="button"
            className="burger"
            aria-label={open ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
