import { afterEach, describe, expect, it, vi } from 'vitest';
import { getReviews } from './opinie';

const ENV = {
  GBP_CLIENT_ID: 'id',
  GBP_CLIENT_SECRET: 'secret',
  GBP_REFRESH_TOKEN: 'refresh',
  GBP_ACCOUNT_ID: '123',
  GBP_LOCATION_ID: '456',
} as unknown as NodeJS.ProcessEnv;

const json = (body: unknown, ok = true) => ({ ok, status: ok ? 200 : 500, json: async () => body });

afterEach(() => vi.restoreAllMocks());

describe('getReviews', () => {
  it('bez kluczy zwraca source: none (strona pokazuje opinie zapasowe)', async () => {
    const r = await getReviews({} as NodeJS.ProcessEnv);
    expect(r.body).toEqual({ source: 'none' });
  });

  it('pobiera wszystkie strony opinii i mapuje je', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(json({ access_token: 'tok' }) as Response)
      .mockResolvedValueOnce(
        json({
          averageRating: 4.837,
          totalReviewCount: 3,
          nextPageToken: 'p2',
          reviews: [
            {
              reviewer: { displayName: 'Jan' },
              starRating: 'FIVE',
              comment: 'Super',
              createTime: '2026-10-01T00:00:00Z',
            },
          ],
        }) as Response,
      )
      .mockResolvedValueOnce(
        json({
          reviews: [
            { reviewer: { displayName: 'Ola' }, starRating: 'FOUR', comment: '' },
            { starRating: 'THREE', comment: 'OK' },
          ],
        }) as Response,
      );

    const r = await getReviews(ENV);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(String(fetchMock.mock.calls[2]?.[0])).toContain('pageToken=p2');
    expect(r.maxAge).toBe(86400);
    expect(r.body).toMatchObject({ source: 'google', rating: 4.8, count: 3 });
    if (r.body.source === 'google') {
      expect(r.body.reviews.map((x) => x.name)).toEqual(['Jan', 'Klient Google']); // pusta opinia Oli pominięta
    }
  });

  it('błąd Google → source: error i krótki cache', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce(json({}, false) as Response);
    const r = await getReviews(ENV);
    expect(r).toEqual({ body: { source: 'error' }, maxAge: 600 });
  });
});
