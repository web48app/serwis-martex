import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import './SectionHead.css';

interface Props {
  label: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Poziom nagłówka — h1 tylko w nagłówkach podstron */
  level?: 'h2' | 'h3';
}

export function SectionHead({ label, title, lead, level: H = 'h2' }: Props) {
  return (
    <div className="sec-head">
      <Reveal>
        <span className="label">{label}</span>
        <H className="sec-head__title">{title}</H>
      </Reveal>
      {lead && (
        <Reveal delay={1} as="p" className="lead">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
