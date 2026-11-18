import { describe, expect, it } from 'vitest';
import { cleanReviewText, mapGbpReview, mapGbpReviews, roundRating } from './reviews';

describe('cleanReviewText', () => {
  it('zostawia oryginał przy tłumaczeniu Google', () => {
    expect(cleanReviewText('Great service (Translated by Google) (Original) Świetny serwis')).toBe(
      'Świetny serwis',
    );
    expect(cleanReviewText('Świetnie (Translated by Google) Great')).toBe('Świetnie');
    expect(cleanReviewText('  zwykły tekst ')).toBe('zwykły tekst');
  });
});

describe('mapGbpReview', () => {
  it('mapuje gwiazdki, autora i odpowiedź', () => {
    expect(
      mapGbpReview({
        reviewer: { displayName: 'Jan Kowalski' },
        starRating: 'FOUR',
        comment: 'Dobrze',
        createTime: '2026-10-01T10:00:00Z',
        reviewReply: { comment: 'Dzięki!' },
      }),
    ).toEqual({
      name: 'Jan Kowalski',
      stars: 4,
      text: 'Dobrze',
      date: '2026-10-01T10:00:00Z',
      reply: 'Dzięki!',
    });
  });

  it('anonimowy autor i brakujące pola', () => {
    expect(mapGbpReview({ reviewer: { isAnonymous: true, displayName: 'X' } })).toEqual({
      name: 'Klient Google',
      stars: 0,
      text: '',
      date: '',
      reply: '',
    });
  });

  it('odfiltrowuje oceny bez treści', () => {
    expect(mapGbpReviews([{ comment: '' }, { comment: 'OK', starRating: 'FIVE' }])).toHaveLength(1);
  });
});

describe('roundRating', () => {
  it('zaokrągla do 1 miejsca', () => {
    expect(roundRating(4.8361)).toBe(4.8);
    expect(roundRating(undefined)).toBeNull();
    expect(roundRating(Number.NaN)).toBeNull();
  });
});
