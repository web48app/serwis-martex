# Opinie Google — wszystkie, za darmo, same się aktualizują

Strona pobiera opinie przez **Google Business Profile API** (bezpłatne) w funkcji `api/opinie.ts`.
Dopóki nie ustawisz kluczy, strona pokazuje opinie wpisane na stałe — nic się nie psuje.

## 1. Dostęp do wizytówki (właściciel)
Właściciel w panelu Profilu Firmy Google → **Osoby i dostęp** → **Dodaj** → Twój e-mail → rola **Menedżer**.
Zaakceptuj zaproszenie z maila.

## 2. Projekt w Google Cloud (bez karty)
1. https://console.cloud.google.com → nowy projekt, np. `martex-opinie`.
2. Zapisz **numer projektu** (Project number) — potrzebny do wniosku.

## 3. Wniosek o dostęp do API
Wyszukaj „Business Profile API access request” (formularz Google), wybierz *Application for Basic API Access*.
Podaj numer projektu i e-mail menedżera wizytówki. Cel: „Wyświetlanie opinii klienta na jego stronie internetowej”.
Czekasz na maila z akceptacją (kilka dni – kilka tygodni).

## 4. Po akceptacji: włącz API i utwórz klienta OAuth
1. **APIs & Services → Library** → włącz:
   - Google My Business API
   - My Business Account Management API
   - My Business Business Information API
2. **OAuth consent screen** → typ *External*, nazwa dowolna, dodaj swój e-mail jako *Test user*,
   potem przełącz aplikację na **In production** (inaczej token wygaśnie po 7 dniach).
3. **Credentials → Create credentials → OAuth client ID** → typ **Desktop app**.
   Zapisz *Client ID* i *Client secret*.

## 5. Pobierz token (jednorazowo, u siebie)
W PowerShellu, w folderze projektu:
```powershell
$env:GBP_CLIENT_ID="tu-client-id"
$env:GBP_CLIENT_SECRET="tu-client-secret"
node scripts/gbp-token.mjs
```
Zaloguj się kontem, które jest menedżerem wizytówki. Skrypt wypisze 5 wartości.

## 6. Wklej do Vercela
Projekt `serwis-martex` → **Settings → Environment Variables** (Production):
`GBP_CLIENT_ID`, `GBP_CLIENT_SECRET`, `GBP_REFRESH_TOKEN`, `GBP_ACCOUNT_ID`, `GBP_LOCATION_ID`
Potem **Deployments → Redeploy**.

Sprawdzenie: `https://twoja-domena/api/opinie` powinno zwrócić `"source":"google"` i listę opinii.

> Nie wrzucaj tych wartości do repo, nie wklejaj ich nigdzie publicznie.
