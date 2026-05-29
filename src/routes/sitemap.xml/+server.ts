import { getPosts } from '$lib/posts';
import type { RequestHandler } from './$types';

const SITE = 'https://senorgatos.com';

const STATIC_ROUTES = [
  { path: '/',          priority: '1.0',  changefreq: 'weekly'  },
  { path: '/blog',      priority: '0.9',  changefreq: 'weekly'  },
  { path: '/projects',  priority: '0.8',  changefreq: 'monthly' },
  { path: '/hobbies',   priority: '0.8',  changefreq: 'monthly' },
  { path: '/media',     priority: '0.7',  changefreq: 'monthly' },
  { path: '/now',       priority: '0.9',  changefreq: 'weekly'  },
  { path: '/about',     priority: '0.8',  changefreq: 'monthly' },
  { path: '/uses',      priority: '0.6',  changefreq: 'monthly' },
  { path: '/scripts',   priority: '0.7',  changefreq: 'monthly' },
  { path: '/dnd',       priority: '0.6',  changefreq: 'monthly' },
  { path: '/changelog', priority: '0.5',  changefreq: 'weekly'  },
];

export const GET: RequestHandler = async () => {
  const posts = await getPosts();

  const postUrls = posts.map(p => `
  <url>
    <loc>${SITE}/blog/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>never</changefreq>
    <priority>0.7</priority>
  </url>`).join('');

  const staticUrls = STATIC_ROUTES.map(r => `
  <url>
    <loc>${SITE}${r.path}</loc>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${postUrls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
};
