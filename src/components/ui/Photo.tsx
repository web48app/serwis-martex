import { useEffect, useRef, useState } from 'react';
import { fallbackPhotoUrl, localPhotoUrl } from '@/content/photos';

interface Props {
  n: number;
  alt: string;
  className?: string;
  priority?: boolean;
  width?: number;
}

/**
 * Zdjęcie z warsztatu: najpierw plik lokalny (/img/realizacje/NN.jpg),
 * a jeśli go nie ma — zdjęcie z wizytówki Google.
 */
export function Photo({ n, alt, className, priority = false, width = 1600 }: Props) {
  const ref = useRef<HTMLImageElement>(null);
  const [src, setSrc] = useState(localPhotoUrl(n));
  const fallback = fallbackPhotoUrl(n, width);

  const switchToFallback = () => {
    if (fallback && src !== fallback) setSrc(fallback);
  };

  // Obraz mógł się nie wczytać jeszcze przed hydracją React — wtedy onError już nie zadziała.
  useEffect(() => {
    const img = ref.current;
    if (img && img.complete && img.naturalWidth === 0) switchToFallback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      // React 18 zna tylko zapis małymi literami
      {...(priority ? ({ fetchpriority: 'high' } as Record<string, string>) : {})}
      onError={switchToFallback}
    />
  );
}
