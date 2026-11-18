import { useEffect, useState } from 'react';
import type { Review, ReviewsResponse } from '@shared/reviews';
import { company } from '@/content/company';
import { fallbackReviews } from '@/content/reviews';

export interface ReviewsState {
  rating: number;
  count: number;
  reviews: Review[];
  /** true = dane na żywo z Google */
  live: boolean;
}

const FALLBACK: ReviewsState = {
  rating: company.google.rating,
  count: company.google.reviewCount,
  reviews: fallbackReviews,
  live: false,
};

let cache: Promise<ReviewsState> | null = null;

function load(): Promise<ReviewsState> {
  cache ??= fetch('/api/opinie')
    .then((r) => (r.ok ? (r.json() as Promise<ReviewsResponse>) : null))
    .then((data): ReviewsState => {
      if (!data || data.source !== 'google') return FALLBACK;
      return {
        rating: data.rating ?? FALLBACK.rating,
        count: data.count ?? FALLBACK.count,
        reviews: data.reviews.length ? data.reviews : FALLBACK.reviews,
        live: true,
      };
    })
    .catch(() => FALLBACK);
  return cache;
}

/** Opinie z /api/opinie (jedno zapytanie na wizytę, współdzielone przez wszystkie komponenty). */
export function useGoogleReviews(): ReviewsState {
  const [state, setState] = useState<ReviewsState>(FALLBACK);
  useEffect(() => {
    let alive = true;
    load().then((s) => alive && setState(s));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
