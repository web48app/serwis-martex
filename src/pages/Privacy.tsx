import { Link } from 'react-router-dom';
import { company, fullAddress, links } from '@/content/company';
import { STORAGE_KEYS } from '@/lib/storage';
import { openConsentSettings } from '@/lib/consent';
import { Seo } from '@/seo/Seo';
import { PageHero } from '@/components/sections/PageHero';
import './Privacy.css';

export default function Privacy() {
  const ids = [company.nip && `NIP ${company.nip}`, company.regon && `REGON ${company.regon}`]
    .filter(Boolean)
    .join(', ');
  return (
    <>
      <Seo
        title={`Polityka prywatności i cookies — ${company.name}`}
        description={`Polityka prywatności i plików cookies strony ${company.name} w Tarnowie.`}
        path="/polityka-prywatnosci"
        crumb="Polityka prywatności"
      />
      <PageHero
        photo={4}
        crumb="Polityka prywatności"
        title={['Polityka', 'prywatności.']}
        lead="Krótko i po ludzku: jakie dane przetwarzamy, po co i jakie masz prawa."
      />
      <section className="sec">
        <article className="wrap legal">
          <p className="legal__upd">Ostatnia aktualizacja: listopad 2026</p>

          <h2>1. Kto jest administratorem</h2>
          <p>
            Administratorem danych osobowych jest <b>{company.legalName}</b>, {fullAddress}
            {ids && `, ${ids}`}.
          </p>
          <p>Kontakt w sprawach danych osobowych:</p>
          <ul>
            <li>
              telefon: <a href={links.tel}>{company.phone.display}</a>
            </li>
            {company.email && (
              <li>
                e-mail: <a href={`mailto:${company.email}`}>{company.email}</a>
              </li>
            )}
            <li>osobiście lub listownie: {fullAddress}</li>
          </ul>

          <h2>2. Jakie dane i po co</h2>
          <p>
            Strona nie ma formularzy ani kont użytkowników — nie zbieramy przez nią imion, adresów e-mail ani
            numerów telefonów.
          </p>
          <table>
            <thead>
              <tr>
                <th scope="col">Sytuacja</th>
                <th scope="col">Dane</th>
                <th scope="col">Cel i podstawa</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Dzwonisz lub piszesz SMS</td>
                <td>numer telefonu, treść rozmowy/wiadomości, dane auta</td>
                <td>
                  umówienie i wykonanie usługi (art. 6 ust. 1 lit. b RODO), obsługa zapytania (art. 6 ust. 1
                  lit. f RODO)
                </td>
              </tr>
              <tr>
                <td>Odwiedzasz stronę</td>
                <td>adres IP, typ przeglądarki, data i godzina wizyty (logi serwera)</td>
                <td>bezpieczeństwo i prawidłowe działanie strony (art. 6 ust. 1 lit. f RODO)</td>
              </tr>
              <tr>
                <td>Wczytujesz mapę Google</td>
                <td>adres IP, pliki cookies Google</td>
                <td>pokazanie dojazdu — wyłącznie za Twoją zgodą (art. 6 ust. 1 lit. a RODO)</td>
              </tr>
            </tbody>
          </table>

          <h2>3. Komu przekazujemy dane</h2>
          <ul>
            <li>
              <b>Vercel Inc.</b> — firma hostingowa, na której serwerach działa strona (logi serwera).
            </li>
            <li>
              <b>Google Ireland Ltd.</b> — dostawca map (po Twojej zgodzie), opinii wyświetlanych na stronie
              oraz serwerów, z których mogą się wczytywać zdjęcia z naszej wizytówki Google.
            </li>
            <li>Podmiotom uprawnionym na podstawie przepisów prawa, gdy tego zażądają.</li>
          </ul>
          <p>
            Vercel i Google mogą przetwarzać dane także poza Europejskim Obszarem Gospodarczym (m.in. w USA).
            Odbywa się to na podstawie mechanizmów przewidzianych w RODO, takich jak decyzja Komisji
            Europejskiej o odpowiednim stopniu ochrony (EU-US Data Privacy Framework) lub standardowe klauzule
            umowne.
          </p>

          <h2>4. Jak długo</h2>
          <ul>
            <li>
              Dane z kontaktu telefonicznego — przez czas potrzebny do obsługi zapytania i wykonania usługi, a
              następnie przez okres wymagany przepisami (np. podatkowymi) lub do przedawnienia roszczeń.
            </li>
            <li>
              Logi serwera — przez okres ustalony przez dostawcę hostingu, zwykle kilka–kilkanaście dni.
            </li>
            <li>Ustawienia zapisane w przeglądarce — do czasu, aż je usuniesz.</li>
          </ul>

          <h2>5. Pliki cookies i pamięć przeglądarki</h2>
          <table>
            <thead>
              <tr>
                <th scope="col">Nazwa</th>
                <th scope="col">Rodzaj</th>
                <th scope="col">Po co</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>{STORAGE_KEYS.consent}</code>
                </td>
                <td>niezbędne (pamięć przeglądarki)</td>
                <td>zapamiętuje Twoją decyzję o cookies</td>
              </tr>
              <tr>
                <td>
                  <code>{STORAGE_KEYS.theme}</code>
                </td>
                <td>niezbędne (pamięć przeglądarki)</td>
                <td>zapamiętuje wybrany motyw — jasny lub ciemny</td>
              </tr>
              <tr>
                <td>Cookies Google Maps</td>
                <td>zewnętrzne, za zgodą</td>
                <td>działanie osadzonej mapy Google</td>
              </tr>
            </tbody>
          </table>
          <p>
            Nie używamy cookies reklamowych ani narzędzi śledzących. Swoją decyzję możesz w każdej chwili
            zmienić —{' '}
            <button type="button" className="legal__link" onClick={openConsentSettings}>
              otwórz ustawienia cookies
            </button>{' '}
            (link jest też w stopce). Cookies możesz też usunąć lub zablokować w ustawieniach przeglądarki.
          </p>

          <h2>6. Twoje prawa</h2>
          <p>
            Masz prawo do: dostępu do swoich danych, ich sprostowania, usunięcia, ograniczenia przetwarzania,
            przenoszenia danych, sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie oraz
            wycofania zgody w dowolnym momencie (bez wpływu na zgodność z prawem przetwarzania przed jej
            wycofaniem).
          </p>
          <p>
            Jeśli uważasz, że przetwarzamy Twoje dane niezgodnie z prawem, możesz złożyć skargę do Prezesa
            Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa,{' '}
            <a href="https://uodo.gov.pl" target="_blank" rel="noopener">
              uodo.gov.pl
            </a>
            ).
          </p>
          <p>
            Podanie danych jest dobrowolne, ale bez numeru telefonu nie umówimy się na naprawę. Nie
            podejmujemy decyzji w sposób zautomatyzowany i nie profilujemy.
          </p>

          <h2>7. Opinie z Google</h2>
          <p>
            Na stronie wyświetlamy opinie, które klienci opublikowali publicznie w naszej wizytówce Google
            (nazwa autora widoczna w Google, ocena, treść, data i nasza odpowiedź). Pobieramy je automatycznie
            z Google, raz na dobę. Jeśli usuniesz lub zmienisz opinię w Google, zmiana pojawi się również
            tutaj. Podstawą jest nasz prawnie uzasadniony interes w prezentowaniu opinii o naszych usługach
            (art. 6 ust. 1 lit. f RODO).
          </p>

          <h2>8. Linki zewnętrzne</h2>
          <p>
            Na stronie są odnośniki do Google Maps, Waze i wizytówki Google. Po ich kliknięciu obowiązują
            zasady prywatności tych serwisów. <Link to="/kontakt">Wróć do kontaktu</Link>.
          </p>
        </article>
      </section>
    </>
  );
}
