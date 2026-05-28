import { getPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

const SITE = 'https://senorgatos.com';
const TITLE = 'Senor Gatos — Workshop Log';
const DESC  = 'Field notes, articles and miscellaneous transmissions from the basement.';

export const GET: RequestHandler = async () => {
  const posts = await getPosts();

  const items = posts.map(p => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${SITE}/blog/${p.slug}</link>
      <guid>${SITE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt ?? ''}]]></description>
      ${p.tags.map(t => `<category>${t}</category>`).join('\n      ')}
    </item>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${TITLE}</title>
    <link>${SITE}</link>
    <description>${DESC}</description>
    <language>en</language>
    <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'max-age=3600',
    },
  });
};
