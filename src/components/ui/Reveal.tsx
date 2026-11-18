import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  /** 0–3: kolejne elementy wjeżdżają co 80 ms */
  delay?: 0 | 1 | 2 | 3;
  children: ReactNode;
}

/** Element, który płynnie pojawia się przy przewijaniu. Bez JavaScriptu treść jest od razu widoczna. */
export function Reveal({ as: Tag = 'div', delay = 0, className = '', style, children, ...rest }: Props) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`rv${inView ? ' in' : ''} ${className}`.trim()}
      style={delay ? { ...style, transitionDelay: `${delay * 0.08}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
