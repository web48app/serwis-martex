/**
 * Wspólne typy i mapowanie opinii — używane przez funkcję /api/opinie i przez stronę.
 */

export interface Review {
  name: string;
  stars: number;
  text: string;
  /** ISO 8601 */
  date: string;
  reply: string;
}

export type ReviewsResponse =
  | { source: 'google'; rating: number | null; count: number | null; reviews: Review[] }
  | { source: 'none' | 'error' };

/** Kształt opinii zwracanej przez Google Business Profile API (v4, accounts.locations.reviews). */
export interface GbpReview {
  reviewer?: { displayName?: string; isAnonymous?: boolean };
  starRating?: 'STAR_RATING_UNSPECIFIED' | 'ONE' | 'TWO' | 'THREE' | 'FOUR' | 'FIVE';
  comment?: string;
  createTime?: string;
  reviewReply?: { comment?: string };
}

const STARS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 };
const ANONYMOUS = 'Klient Google';

/** Google dokleja tłumaczenia: „… (Translated by Google) … (Original) …” — zostawiamy oryginał. */
export function cleanReviewText(text = ''): string {
  if (text.includes('(Original)')) return text.split('(Original)').pop()!.trim();
  if (text.includes('(Translated by Google)')) return text.split('(Translated by Google)')[0]!.trim();
  return text.trim();
}

export function mapGbpReview(r: GbpReview): Review {
  return {
    name: r.reviewer?.isAnonymous ? ANONYMOUS : r.reviewer?.displayName?.trim() || ANONYMOUS,
    stars: STARS[r.starRating ?? ''] ?? 0,
    text: cleanReviewText(r.comment),
    date: r.createTime ?? '',
    reply: r.reviewReply?.comment ? cleanReviewText(r.reviewReply.comment) : '',
  };
}

/** Same gwiazdki bez treści nie trafiają na stronę. */
export function mapGbpReviews(list: GbpReview[]): Review[] {
  return list.map(mapGbpReview).filter((r) => r.text.length > 0);
}

export function roundRating(value: number | undefined | null): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? Math.round(value * 10) / 10 : null;
}
