import { useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import type { Photo as PhotoT } from '@/content/types';
import { Photo } from './Photo';
import './Lightbox.css';

interface Props {
  photos: PhotoT[];
  index: number | null;
  onChange: (index: number | null) => void;
}

/** Podgląd zdjęcia na pełnym ekranie: Esc zamyka, strzałki przełączają, fokus wraca na miniaturę. */
export function Lightbox({ photos, index, onChange }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const opener = useRef<Element | null>(null);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => index !== null && onChange((index + delta + photos.length) % photos.length),
    [index, onChange, photos.length],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, go, onChange]);

  if (!open) return null;
  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      className="lb island"
      role="dialog"
      aria-modal="true"
      aria-label={`Zdjęcie ${index + 1} z ${photos.length}: ${photo.alt}`}
      onClick={(e) => e.target === e.currentTarget && onChange(null)}
    >
      <button
        ref={closeRef}
        type="button"
        className="lb__btn lb__x"
        aria-label="Zamknij"
        onClick={() => onChange(null)}
      >
        <X aria-hidden="true" />
      </button>
      <button type="button" className="lb__btn lb__p" aria-label="Poprzednie zdjęcie" onClick={() => go(-1)}>
        <ChevronLeft aria-hidden="true" />
      </button>
      <Photo key={photo.n} n={photo.n} alt={photo.alt} priority width={2000} />
      <button type="button" className="lb__btn lb__n" aria-label="Następne zdjęcie" onClick={() => go(1)}>
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
