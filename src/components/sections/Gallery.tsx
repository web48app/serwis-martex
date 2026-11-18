import { useState, type ReactNode } from 'react';
import type { Photo as PhotoT } from '@/content/types';
import { Photo } from '@/components/ui/Photo';
import { Lightbox } from '@/components/ui/Lightbox';
import './Gallery.css';

interface Props {
  photos: PhotoT[];
  /** mosaic — mozaika 6 kolumn (strona główna); grid — równe kafelki; strip — pasek pionowych zdjęć */
  layout?: 'mosaic' | 'grid' | 'strip';
  className?: string;
  /** Własny układ miniaturek (np. kolaż „O firmie”). Dostaje funkcję otwierającą podgląd. */
  render?: (open: (i: number) => void) => ReactNode;
}

export function Gallery({ photos, layout = 'mosaic', className = '', render }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  return (
    <>
      {render ? (
        render(setIndex)
      ) : (
        <div className={`gal gal--${layout} ${className}`.trim()}>
          {photos.map((p, i) => (
            <button
              key={`${p.n}-${i}`}
              type="button"
              className="gal__item"
              onClick={() => setIndex(i)}
              aria-label={`Powiększ: ${p.alt}`}
            >
              <Photo n={p.n} alt={p.alt} width={900} />
            </button>
          ))}
        </div>
      )}
      <Lightbox photos={photos} index={index} onChange={setIndex} />
    </>
  );
}
