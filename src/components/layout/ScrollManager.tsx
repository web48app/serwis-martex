import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Po zmianie podstrony: na górę albo do kotwicy (#opinie, #dojazd). */
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      // poczekaj, aż nowa podstrona się wyrenderuje
      const t = window.setTimeout(
        () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }),
        60,
      );
      return () => window.clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
