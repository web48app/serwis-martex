# Serwis Samochodowy Martex — strona www

Strona [martextarnow.pl](https://martextarnow.pl): React 18 + TypeScript + Vite, prerenderowana do statycznego HTML
(każda podstrona ma pełną treść dla Google), hostowana na Vercelu.

## Szybki start

```bash
npm install
npm run dev        # podgląd na http://localhost:5173
npm run check      # typy + lint + testy + build (to samo robi GitHub przy każdym pushu)
```

Wdrożenie: `git push` na `main` → Vercel sam buduje i publikuje.

## Gdzie co zmienić

Treści są oddzielone od wyglądu — żeby zmienić tekst, cenę czy godziny, **nie trzeba dotykać komponentów**.

| Co | Plik |
|---|---|
| **Domena strony** (canonical, Open Graph, sitemap, robots) | `site.config.json` |
| Nazwa firmy, NIP, telefon, adres, ocena Google | `src/content/company.ts` |
| Godziny otwarcia | `src/content/company.ts` → `hours` |
| Usługi (strona główna + /uslugi), marki, „Jak pracujemy” | `src/content/services.ts` |
| Cennik, prace „wycena indywidualna”, FAQ cennika | `src/content/pricing.ts` |
| Ukrycie/pokazanie cennika w menu | `src/content/navigation.ts` → `PRICING_PUBLIC` |
| FAQ kontaktu, zasady z „O firmie” | `src/content/faq.ts` |
| Opinie zapasowe (gdy Google API nie działa) | `src/content/reviews.ts` |
| Zdjęcia z warsztatu | `public/img/realizacje/01.jpg … 10.jpg` |

Zdjęcia: wrzuć pliki `01.jpg` – `10.jpg` (max ~400 KB, np. `magick in.jpg -resize 1920x -quality 82 01.jpg`).
Dopóki pliku nie ma, strona pokazuje zdjęcie z wizytówki Google.

## Struktura

```
src/
  content/      dane i teksty (typowane)
  lib/          logika bez Reacta: godziny otwarcia, daty, motyw, zgody (z testami)
  hooks/        hooki React: status otwarcia, motyw, opinie, animacje
  components/
    layout/     pasek górny, nawigacja, stopka, baner cookies, pasek mobilny
    sections/   sekcje stron (Hero, Usługi, Opony + koło SVG, Opinie, Mapa…)
    ui/         przyciski, zdjęcia, lightbox, nagłówki sekcji
  pages/        podstrony (każda ładowana osobno)
  seo/          meta tagi, Open Graph, dane strukturalne (schema.org)
  styles/       tokeny (kolory, motywy), baza, wzorce wspólne
api/opinie.ts   funkcja Vercel: opinie z Google Business Profile API
shared/         kod wspólny dla strony i funkcji (typy i mapowanie opinii)
scripts/        sitemap po buildzie, pobranie tokenu Google
```

Style: każdy komponent ma własny plik `.css` obok siebie; kolory i motywy wyłącznie przez zmienne z
`src/styles/tokens.css`. Sekcje z klasą `.island` zawsze zostają ciemne (zdjęcia, pasek górny, stopka).
Tailwind jest skonfigurowany na te same tokeny (np. `text-red`, `bg-steel`).

## Opinie Google

Instrukcja podłączenia: [OPINIE-GOOGLE.md](OPINIE-GOOGLE.md). Bez kluczy strona działa normalnie na opiniach zapasowych.

## Prywatność

- Czcionki są lokalne (`public/fonts`), bez połączeń z Google Fonts.
- Mapa Google wczytuje się dopiero po zgodzie (baner cookies) albo kliknięciu „Pokaż mapę”.
- Pamięć przeglądarki: `martex-theme` (motyw), `martex-consent` (decyzja o cookies). Brak analityki i reklam.
