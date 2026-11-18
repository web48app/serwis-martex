import type { RouteRecord } from 'vite-react-ssg';
import { Layout } from '@/components/layout/Layout';

/** Każda podstrona ładuje się osobno (podział kodu), ale jest prerenderowana do statycznego HTML. */
const page = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
});

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    entry: 'src/components/layout/Layout.tsx',
    children: [
      { index: true, lazy: page(() => import('@/pages/Home')) },
      { path: 'uslugi', lazy: page(() => import('@/pages/Services')) },
      { path: 'cennik', lazy: page(() => import('@/pages/Pricing')) },
      { path: 'o-firmie', lazy: page(() => import('@/pages/About')) },
      { path: 'kontakt', lazy: page(() => import('@/pages/Contact')) },
      { path: 'polityka-prywatnosci', lazy: page(() => import('@/pages/Privacy')) },
      { path: '404', lazy: page(() => import('@/pages/NotFound')) },
      { path: '*', lazy: page(() => import('@/pages/NotFound')) },
    ],
  },
];
