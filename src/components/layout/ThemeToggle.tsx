import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const [theme, toggle] = useTheme();
  const light = theme === 'light';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={light ? 'Włącz ciemny motyw' : 'Włącz jasny motyw'}
      title="Jasny / ciemny motyw"
    >
      {light ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
