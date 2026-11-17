// Vercel Function: GET /api/opinie
// Pobiera WSZYSTKIE opinie z Google Business Profile API (bezpłatne) i oddaje je stronie.
// Wynik jest cache'owany na CDN Vercela przez 24 h — Google dostaje ~1 zapytanie na dobę.
//
// Wymagane zmienne środowiskowe w Vercelu (Settings → Environment Variables):
//   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID
// Dopóki ich nie ma, funkcja zwraca { source: "none" }, a strona pokazuje opinie wpisane na stałe.

const STARS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };

// Google dokleja tłumaczenia: "... (Translated by Google) ... (Original) ..." — zostawiamy oryginał.
function cleanText(t = '') {
  if (t.includes('(Original)')) t = t.split('(Original)').pop();
  else if (t.includes('(Translated by Google)')) t = t.split('(Translated by Google)')[0];
  return t.trim();
}

async function accessToken() {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GBP_CLIENT_ID,
      client_secret: process.env.GBP_CLIENT_SECRET,
      refresh_token: process.env.GBP_REFRESH_TOKEN,
      grant_type: 'refresh_token'
    })
  });
  if (!r.ok) throw new Error('token ' + r.status);
  return (await r.json()).access_token;
}

async function allReviews(token) {
  const base = `https://mybusiness.googleapis.com/v4/accounts/${process.env.GBP_ACCOUNT_ID}/locations/${process.env.GBP_LOCATION_ID}/reviews`;
  let page = '', reviews = [], meta = {};
  for (let i = 0; i < 20; i++) {               // max 20 × 50 = 1000 opinii
    const url = `${base}?pageSize=50&orderBy=updateTime%20desc${page ? '&pageToken=' + page : ''}`;
    const r = await fetch(url, { headers: { Authorization: 'Bearer ' + token } });
    if (!r.ok) throw new Error('reviews ' + r.status);
    const d = await r.json();
    meta = { rating: d.averageRating, count: d.totalReviewCount };
    reviews = reviews.concat(d.reviews || []);
    if (!d.nextPageToken) break;
    page = d.nextPageToken;
  }
  return { meta, reviews };
}

module.exports = async function handler(req, res) {
  const need = ['GBP_CLIENT_ID', 'GBP_CLIENT_SECRET', 'GBP_REFRESH_TOKEN', 'GBP_ACCOUNT_ID', 'GBP_LOCATION_ID'];
  if (need.some(k => !process.env[k])) {
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    return res.status(200).json({ source: 'none' });
  }
  try {
    const { meta, reviews } = await allReviews(await accessToken());
    const out = reviews
      .map(r => ({
        name: r.reviewer?.isAnonymous ? 'Klient Google' : (r.reviewer?.displayName || 'Klient Google'),
        stars: STARS[r.starRating] || 0,
        text: cleanText(r.comment),
        date: r.createTime,
        reply: r.reviewReply?.comment ? cleanText(r.reviewReply.comment) : ''
      }))
      .filter(r => r.text);                    // bez pustych ocen (same gwiazdki)
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
    return res.status(200).json({
      source: 'google',
      rating: meta.rating ? Math.round(meta.rating * 10) / 10 : null,
      count: meta.count || null,
      reviews: out
    });
  } catch (e) {
    console.error('opinie:', e.message);
    res.setHeader('Cache-Control', 'public, s-maxage=600');
    return res.status(200).json({ source: 'error' });
  }
};
