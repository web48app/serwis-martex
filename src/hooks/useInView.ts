import { useEffect, useRef, useState } from 'react';

/** Zwraca `true` raz, gdy element pojawi się w widoku (potem przestaje obserwować). */
export function useInView<T extends Element>(options: IntersectionObserverInit = { threshold: 0.15 }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  const { threshold, rootMargin } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: rootMargin ?? '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold, rootMargin]);

  return [ref, inView] as const;
}
