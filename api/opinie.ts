/**
 * GET /api/opinie — wszystkie opinie z Google Business Profile API (bezpłatne).
 * Odpowiedź jest cache'owana na CDN Vercela przez 24 h, więc Google dostaje ~1 zapytanie na dobę.
 *
 * Zmienne środowiskowe (Vercel → Settings → Environment Variables):
 *   GBP_CLIENT_ID, GBP_CLIENT_SECRET, GBP_REFRESH_TOKEN, GBP_ACCOUNT_ID, GBP_LOCATION_ID
 * Bez nich zwraca { source: "none" }, a strona pokazuje opinie zapasowe.
 */
import { mapGbpReviews, roundRating, type GbpReview, type ReviewsResponse } from '../shared/reviews';

interface Res {
  setHeader(name: string, value: string): void;
  status(code: number): { json(body: ReviewsResponse): void };
}

const REQUIRED = [
  'GBP_CLIENT_ID',
  'GBP_CLIENT_SECRET',
  'GBP_REFRESH_TOKEN',
  'GBP_ACCOUNT_ID',
  'GBP_LOCATION_ID',
] as const;
const MAX_PAGES = 20; // 20 × 50 = do 1000 opinii

async function accessToken(env: NodeJS.ProcessEnv): Promise<string> {
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.GBP_CLIENT_ID!,
      client_secret: env.GBP_CLIENT_SECRET!,
      refresh_token: env.GBP_REFRESH_TOKEN!,
      grant_type: 'refresh_token',
    }),
  });
  if (!r.ok) throw new Error(`token ${r.status}`);
  return ((await r.json()) as { access_token: string }).access_token;
}

interface ReviewsPage {
  reviews?: GbpReview[];
  averageRating?: number;
  totalReviewCount?: number;
  nextPageToken?: string;
}

async function fetchAll(env: NodeJS.ProcessEnv, token: string) {
  const base = `https://mybusiness.googleapis.com/v4/accounts/${env.GBP_ACCOUNT_ID}/locations/${env.GBP_LOCATION_ID}/reviews`;
  let pageToken = '';
  let reviews: GbpReview[] = [];
  let rating: number | undefined;
  let count: number | undefined;
  for (let i = 0; i < MAX_PAGES; i++) {
    const url = `${base}?pageSize=50&orderBy=updateTime%20desc${pageToken ? `&pageToken=${pageToken}` : ''}`;
    const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
    if (!r.ok) throw new Error(`reviews ${r.status}`);
    const page = (await r.json()) as ReviewsPage;
    rating ??= page.averageRating;
    count ??= page.totalReviewCount;
    reviews = reviews.concat(page.reviews ?? []);
    if (!page.nextPageToken) break;
    pageToken = page.nextPageToken;
  }
  return { rating, count, reviews };
}

export async function getReviews(
  env: NodeJS.ProcessEnv = process.env,
): Promise<{ body: ReviewsResponse; maxAge: number }> {
  if (REQUIRED.some((k) => !env[k])) return { body: { source: 'none' }, maxAge: 3600 };
  try {
    const { rating, count, reviews } = await fetchAll(env, await accessToken(env));
    return {
      body: {
        source: 'google',
        rating: roundRating(rating),
        count: count ?? null,
        reviews: mapGbpReviews(reviews),
      },
      maxAge: 86400,
    };
  } catch (e) {
    console.error('opinie:', e instanceof Error ? e.message : e);
    return { body: { source: 'error' }, maxAge: 600 };
  }
}

export default async function handler(_req: unknown, res: Res) {
  const { body, maxAge } = await getReviews();
  res.setHeader('Cache-Control', `public, s-maxage=${maxAge}, stale-while-revalidate=604800`);
  res.status(200).json(body);
}
