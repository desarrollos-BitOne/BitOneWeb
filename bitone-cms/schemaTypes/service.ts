import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Servicio',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Identificador único para la URL del servicio (ej. desarrollo-web).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtítulo / Gancho (Hook)',
      type: 'string',
      description: 'Frase corta e impactante que aparece bajo el título.',
    }),
    defineField({
      name: 'icon',
      title: 'Icono del Servicio',
      type: 'image',
      options: { hotspot: true },
      description: 'Icono pequeño que se muestra en las tarjetas de la lista.',
    }),
    defineField({
      name: 'image',
      title: 'Imagen de Portada (Hero)',
      type: 'image',
      options: { hotspot: true },
      description: 'Imagen grande que aparecerá en el fondo del encabezado de la página de detalle.',
    }),
    defineField({
      name: 'summary',
      title: 'Resumen Corto',
      type: 'text',
      rows: 3,
      description: 'Breve descripción para la tarjeta del listado.',
    }),
    defineField({
      name: 'content',
      title: 'Contenido Detallado (Artículo)',
      type: 'blockContent',
      description: 'Cuerpo completo del servicio con texto enriquecido e imágenes.',
    }),
    defineField({
      name: 'actionUrl',
      title: 'Enlace del Botón "Saber más" (Opcional)',
      type: 'string',
      description: 'Si se deja vacío, usará el slug automático del servicio.',
    }),
  ],
})
