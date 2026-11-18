// Po buildzie: sitemap.xml i robots.txt z wygenerowanych stron (bez 404 i stron z noindex).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = 'dist';
const { siteUrl: SITE } = JSON.parse(await readFile('site.config.json', 'utf8'));

const files = (await readdir(DIST)).filter((f) => f.endsWith('.html') && f !== '404.html');
const urls = [];
for (const f of files) {
  const html = await readFile(join(DIST, f), 'utf8');
  if (/<meta[^>]*name="robots"[^>]*content="noindex"/.test(html)) continue;
  const path = f === 'index.html' ? '/' : `/${f.replace(/\.html$/, '')}`;
  urls.push(path);
}
urls.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod><priority>${u === '/' ? '1.0' : '0.8'}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(DIST, 'sitemap.xml'), xml);
await writeFile(
  join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`,
);
console.log(`domena: ${SITE}`);
console.log(`sitemap.xml: ${urls.length} adresów → ${urls.join(', ')}`);
