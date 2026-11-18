import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import type { Review } from '@shared/reviews';
import { links } from '@/content/company';
import { useGoogleReviews } from '@/hooks/useGoogleReviews';
import { formatRating, initial } from '@/lib/format';
import { timeAgoPl } from '@/lib/relativeTime';
import { Button } from '@/components/ui/Button';
import { GoogleIcon } from '@/components/ui/GoogleIcon';
import { Reveal } from '@/components/ui/Reveal';
import { Stars } from '@/components/ui/Stars';
import './Reviews.css';

function ReviewCard({ review }: { review: Review }) {
  const when = timeAgoPl(review.date);
  return (
    <article className="rcard">
      <header className="rcard__top">
        <div className="rcard__who">
          <span className="av" aria-hidden="true">
            {initial(review.name)}
          </span>
          <div>
            <b>{review.name}</b>
            <small>Google · {when || `${review.stars}/5`}</small>
          </div>
        </div>
        <Stars value={review.stars} />
      </header>
      <p>„{review.text}”</p>
      {review.reply && (
        <div className="rcard__reply">
          <b>Odpowiedź Martex</b>
          {review.reply}
        </div>
      )}
    </article>
  );
}

export function Reviews() {
  const { rating, count, reviews } = useGoogleReviews();
  const track = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>('.rcard');
    if (el && card) el.scrollBy({ left: (card.offsetWidth + 16) * dir, behavior: 'smooth' });
  };

  return (
    <section className="sec" id="opinie" aria-labelledby="reviews-title">
      <div className="wrap">
        <div className="rev__top">
          <Reveal className="gcard">
            <div className="gcard__head">
              <GoogleIcon /> Opinie w Google
            </div>
            <div className="gcard__score">
              <b>{formatRating(rating)}</b>
              <Stars value={5} />
            </div>
            <p>na podstawie {count} opinii klientów</p>
            <div className="gcard__btns">
              <a className="gbtn gbtn--blue" href={links.googleWriteReview} target="_blank" rel="noopener">
                <Star aria-hidden="true" fill="currentColor" /> Wystaw opinię
              </a>
              <a className="gbtn gbtn--line" href={links.googleProfile} target="_blank" rel="noopener">
                Zobacz wszystkie
              </a>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <span className="label">Opinie klientów</span>
            <h2 id="reviews-title">
              Mówią <em>za nas</em>.
            </h2>
            <div className="rev__nav">
              <button type="button" aria-label="Poprzednie opinie" onClick={() => scroll(-1)}>
                <ChevronLeft aria-hidden="true" />
              </button>
              <button type="button" aria-label="Następne opinie" onClick={() => scroll(1)}>
                <ChevronRight aria-hidden="true" />
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={2}>
          <div
            ref={track}
            className="rev__track"
            tabIndex={0}
            aria-label="Opinie klientów — przewijane poziomo"
          >
            {reviews.map((r, i) => (
              <ReviewCard key={`${r.name}-${i}`} review={r} />
            ))}
          </div>
        </Reveal>

        <Reveal className="revcta">
          <p>
            <b>Byłeś u nas?</b> Zostaw opinię w Google — zajmie minutę, a nam bardzo pomaga.
          </p>
          <Button
            href={links.googleWriteReview}
            external
            icon={<Star aria-hidden="true" fill="currentColor" />}
          >
            Wystaw opinię
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
