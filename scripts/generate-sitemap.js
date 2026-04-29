import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'fjtg86e5',
  dataset: 'production',
  apiVersion: '2026-02-25',
  useCdn: false,
});

async function generateSitemap() {
  const baseUrl = 'https://bit-one.net';
  
  // Rutas estáticas
  const staticRoutes = [
    '/',
    '/servicios',
    '/como-trabajamos',
    '/nosotros',
    '/proyectos',
    '/blog',
  ];

  // Obtener posts de Sanity
  const query = `*[_type == "post" && defined(slug.current)] { "slug": slug.current, "_updatedAt": _updatedAt }`;
  const posts = await client.fetch(query);

  const lastMod = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Añadir rutas estáticas
  staticRoutes.forEach(route => {
    const priority = route === '/' ? '1.0' : '0.8';
    // Evitar doble slash en la concatenación
    const fullUrl = route === '/' ? baseUrl + '/' : baseUrl + route;
    xml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  });

  // Añadir posts
  posts.forEach(post => {
    const postDate = post._updatedAt.split('T')[0];
    xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <priority>0.6</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`Sitemap generado con éxito en ${outputPath}`);
}

generateSitemap().catch(console.error);
