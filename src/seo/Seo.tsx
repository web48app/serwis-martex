import { Head } from 'vite-react-ssg';
import { company } from '@/content/company';
import { breadcrumbLd, localBusinessLd } from './jsonLd';

interface Props {
  title: string;
  description: string;
  /** Ścieżka bez domeny, np. „/uslugi” */
  path: string;
  /** Nazwa w okruszkach (dla podstron) */
  crumb?: string;
  noindex?: boolean;
}

export function Seo({ title, description, path, crumb, noindex = false }: Props) {
  const url = `${company.siteUrl}${path === '/' ? '/' : path}`;
  const image = `${company.siteUrl}/img/og.jpg`;
  const ld: object[] = [localBusinessLd()];
  if (crumb) ld.push(breadcrumbLd(crumb, path));

  return (
    <Head>
      <html lang="pl" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Head>
  );
}
