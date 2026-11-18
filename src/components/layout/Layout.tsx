import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Header } from './Header';
import { Footer } from './Footer';
import { MobileBar } from './MobileBar';
import { ScrollTop } from './ScrollTop';
import { CookieBanner } from './CookieBanner';
import { ScrollManager } from './ScrollManager';

export function Layout() {
  return (
    <>
      <a href="#tresc" className="skip-link">
        Przejdź do treści
      </a>
      <ScrollManager />
      <TopBar />
      <Header />
      <main id="tresc">
        <Outlet />
      </main>
      <Footer />
      <MobileBar />
      <ScrollTop />
      <CookieBanner />
    </>
  );
}
