import { hours } from '@/content/company';
import { DAY_NAMES, WEEK_ORDER, formatRange } from '@/lib/openingHours';
import { useOpenStatus } from '@/hooks/useOpenStatus';
import './HoursTable.css';

export function HoursTable() {
  const status = useOpenStatus();
  return (
    <table className="hours">
      <caption className="sr-only">Godziny otwarcia</caption>
      <tbody>
        {WEEK_ORDER.map((d) => {
          const isToday = status?.today === d;
          const cls = [isToday && 'today', !hours[d] && 'off'].filter(Boolean).join(' ') || undefined;
          return (
            <tr key={d} className={cls} aria-current={isToday ? 'date' : undefined}>
              <th scope="row">{DAY_NAMES[d]}</th>
              <td>{formatRange(hours[d], true)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
