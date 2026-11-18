import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

type Variant = 'red' | 'ghost';
type Size = 'md' | 'sm';

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

type Props =
  | (Common & { to: string; href?: never; onClick?: never })
  | (Common & { href: string; external?: boolean; to?: never; onClick?: never })
  | (Common & { onClick: () => void; to?: never; href?: never; type?: 'button' });

/** Przycisk/link w stylu marki. `to` = link wewnętrzny, `href` = zewnętrzny/tel:, `onClick` = przycisk. */
export function Button(props: Props) {
  const { variant = 'red', size = 'md', icon, className = '', children } = props;
  const cls = `btn btn--${variant}${size === 'sm' ? ' btn--sm' : ''} ${className}`.trim();
  const content = (
    <>
      {icon}
      {children}
    </>
  );
  if ('to' in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {content}
      </Link>
    );
  }
  if ('href' in props && props.href) {
    const ext = props.external ? { target: '_blank', rel: 'noopener' } : {};
    return (
      <a href={props.href} className={cls} {...ext}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={'onClick' in props ? props.onClick : undefined}>
      {content}
    </button>
  );
}
