import type { ReactNode } from 'react';
import type { FaqItem } from '@/content/types';
import { Reveal } from '@/components/ui/Reveal';
import './Faq.css';

interface Props {
  label: string;
  title: ReactNode;
  items: FaqItem[];
  aside?: ReactNode;
}

export function Faq({ label, title, items, aside }: Props) {
  return (
    <section className="sec">
      <div className="wrap faqwrap">
        <Reveal>
          <span className="label">{label}</span>
          <h2>{title}</h2>
          {aside}
        </Reveal>
        <Reveal delay={1} className="faq">
          {items.map((f, i) => (
            <details key={f.q} open={i === 0}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
