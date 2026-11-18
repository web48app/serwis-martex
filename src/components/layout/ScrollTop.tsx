import { ArrowUp } from 'lucide-react';
import { useScrolled } from '@/hooks/useScrolled';
import './ScrollTop.css';

export function ScrollTop() {
  const show = useScrolled(700);
  return (
    <button
      type="button"
      className={`totop${show ? ' show' : ''}`}
      aria-label="Przewiń do góry"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <ArrowUp aria-hidden="true" />
    </button>
  );
}
