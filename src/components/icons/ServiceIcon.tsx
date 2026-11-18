import { Disc3, Filter, Snowflake, Zap, type LucideIcon } from 'lucide-react';
import type { ServiceIcon as IconName } from '@/content/types';

const MAP: Partial<Record<IconName, LucideIcon>> = {
  electric: Zap,
  filter: Filter,
  ac: Snowflake,
  brake: Disc3,
};

export function ServiceIcon({ name }: { name: IconName }) {
  const Icon = MAP[name] ?? Zap;
  return <Icon strokeWidth={1.4} aria-hidden="true" />;
}
