import { SITE } from '../consts';
import { sitePath } from '../utils/urls';

export function GET(context: { site: URL }) {
  const sitemap = new URL(sitePath('/sitemap-index.xml'), context.site ?? SITE.url).href;
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
