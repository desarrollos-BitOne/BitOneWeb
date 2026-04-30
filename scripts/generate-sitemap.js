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

  // Obtener posts, proyectos y servicios de Sanity
  const postsQuery = `*[_type == "post" && defined(slug.current)] { "slug": slug.current, "_updatedAt": _updatedAt }`;
  const projectsQuery = `*[_type == "project" && defined(slug.current)] { "slug": slug.current, "_updatedAt": _updatedAt }`;
  const servicesQuery = `*[_type == "service" && defined(slug.current)] { "slug": slug.current, "_updatedAt": _updatedAt }`;

  const [posts, projects, services] = await Promise.all([
    client.fetch(postsQuery),
    client.fetch(projectsQuery),
    client.fetch(servicesQuery)
  ]);

  const lastMod = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Añadir rutas estáticas
  staticRoutes.forEach(route => {
    const priority = route === '/' ? '1.0' : '0.8';
    const fullUrl = route === '/' ? baseUrl + '/' : baseUrl + route;
    xml += `
  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastMod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  });

  // Añadir posts (Blog)
  posts.forEach(post => {
    const postDate = post._updatedAt.split('T')[0];
    xml += `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${postDate}</lastmod>
    <priority>0.7</priority>
  </url>`;
  });

  // Añadir Proyectos
  projects.forEach(proj => {
    const projDate = proj._updatedAt.split('T')[0];
    xml += `
  <url>
    <loc>${baseUrl}/proyectos/${proj.slug}</loc>
    <lastmod>${projDate}</lastmod>
    <priority>0.8</priority>
  </url>`;
  });

  // Añadir Servicios
  services.forEach(ser => {
    const serDate = ser._updatedAt.split('T')[0];
    xml += `
  <url>
    <loc>${baseUrl}/servicios/${ser.slug}</loc>
    <lastmod>${serDate}</lastmod>
    <priority>0.9</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  console.log(`Sitemap generado con éxito en ${outputPath}`);
}

generateSitemap().catch(console.error);
