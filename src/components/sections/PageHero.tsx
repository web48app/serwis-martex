import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Photo } from '@/components/ui/Photo';
import './PageHero.css';

interface Props {
  photo: number;
  crumb: string;
  title: [string, string];
  lead: ReactNode;
}

/** Nagłówek podstrony: zdjęcie w tle, okruszki, H1 w dwóch liniach (druga na czerwono). */
export function PageHero({ photo, crumb, title, lead }: Props) {
  return (
    <section className="phero island">
      <div className="phero__bg">
        <Photo n={photo} alt="" priority />
      </div>
      <div className="wrap">
        <nav className="crumbs" aria-label="Okruszki">
          <Link to="/">Start</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <h1>
          {title[0]}
          <br />
          <em>{title[1]}</em>
        </h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}
