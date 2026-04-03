import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url'; // Nuevo estándar

export const client = createClient({
  projectId: 'fjtg86e5',
  dataset: 'production',
  apiVersion: '2026-02-25', 
  useCdn: false, // Bypassa el CDN para datos frescos
  // Opcional: añade perspective para ver borradores si usas un Token
  // perspective: 'previewDrafts', 
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source) => {
  if (!source) return { url: () => '' };
  return builder.image(source);
};