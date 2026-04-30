import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'fjtg86e5',
  dataset: 'production',
  apiVersion: '2026-02-25', 
  useCdn: true, // Cambiamos a TRUE para aprovechar el caché global de Sanity y mejorar velocidad
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return { url: () => '' };
  // Aplicamos optimizaciones automáticas de Sanity: WebP/Avif y calidad balanceada
  return builder.image(source).auto('format').quality(75);
};