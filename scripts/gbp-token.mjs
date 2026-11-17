// Jednorazowy skrypt: pobiera REFRESH TOKEN oraz ID konta i lokalizacji dla Google Business Profile API.
// Uruchom u siebie (PowerShell, w folderze strony):
//   $env:GBP_CLIENT_ID="...";  $env:GBP_CLIENT_SECRET="...";  node scripts/gbp-token.mjs
// Otworzy się link do logowania Google — zaloguj się kontem, które jest MENEDŻEREM wizytówki Martex.
// Na końcu skrypt wypisze 5 wartości do wklejenia w Vercel → Settings → Environment Variables.
// Nie wrzucaj tych wartości do repo ani nikomu nie wysyłaj.

import http from 'node:http';
import { exec } from 'node:child_process';

const CLIENT_ID = process.env.GBP_CLIENT_ID;
const CLIENT_SECRET = process.env.GBP_CLIENT_SECRET;
const PORT = 5555;
const REDIRECT = `http://localhost:${PORT}`;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('Ustaw najpierw GBP_CLIENT_ID i GBP_CLIENT_SECRET (patrz komentarz na górze pliku).');
  process.exit(1);
}

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT,
  response_type: 'code',
  scope: 'https://www.googleapis.com/auth/business.manage',
  access_type: 'offline',
  prompt: 'consent'
});

const server = http.createServer(async (req, res) => {
  const code = new URL(req.url, REDIRECT).searchParams.get('code');
  if (!code) { res.end('Brak kodu.'); return; }
  res.end('Gotowe — wróć do terminala. To okno możesz zamknąć.');
  server.close();

  const tok = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: REDIRECT, grant_type: 'authorization_code' })
  }).then(r => r.json());

  if (!tok.refresh_token) { console.error('Nie dostałem refresh tokena:', tok); process.exit(1); }
  const auth = { Authorization: 'Bearer ' + tok.access_token };

  const acc = await fetch('https://mybusinessaccountmanagement.googleapis.com/v1/accounts', { headers: auth }).then(r => r.json());
  if (!acc.accounts) { console.error('Brak dostępu do kont — czy Google zatwierdził wniosek o API?', acc); process.exit(1); }

  console.log('\n=== Wklej do Vercel → Settings → Environment Variables ===\n');
  console.log('GBP_CLIENT_ID     =', CLIENT_ID);
  console.log('GBP_CLIENT_SECRET =', CLIENT_SECRET);
  console.log('GBP_REFRESH_TOKEN =', tok.refresh_token);

  for (const a of acc.accounts) {
    const id = a.name.split('/')[1];
    const loc = await fetch(`https://mybusinessbusinessinformation.googleapis.com/v1/${a.name}/locations?readMask=name,title,storefrontAddress&pageSize=100`, { headers: auth }).then(r => r.json());
    for (const l of loc.locations || []) {
      console.log(`\n# ${l.title} — ${l.storefrontAddress?.addressLines?.join(', ') || ''}`);
      console.log('GBP_ACCOUNT_ID    =', id);
      console.log('GBP_LOCATION_ID   =', l.name.split('/')[1]);
    }
  }
  console.log('\nWybierz ACCOUNT_ID i LOCATION_ID przy wizytówce „Serwis Samochodowy Martex”.\n');
});

server.listen(PORT, () => {
  console.log('Otwieram logowanie Google…\nJeśli przeglądarka się nie otworzy, wejdź ręcznie:\n\n' + authUrl + '\n');
  const cmd = process.platform === 'win32' ? `start "" "${authUrl}"` : process.platform === 'darwin' ? `open "${authUrl}"` : `xdg-open "${authUrl}"`;
  exec(cmd);
});
