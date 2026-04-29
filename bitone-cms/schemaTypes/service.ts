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
      description: 'Frase corta e impactante que aparece bajo el título tanto en el Home como en la página de servicios.',
    }),
    defineField({
      name: 'summary',
      title: 'Resumen Corto',
      type: 'text',
      rows: 3,
      description: 'Breve descripción que aparece exclusivamente en la tarjeta del Home.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Detallada',
      type: 'blockContent',
      description: 'Contenido extenso que aparece exclusivamente en la sección de servicios.',
    }),
    defineField({
      name: 'icon',
      title: 'Imagen representativa',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'actionUrl',
      title: 'Enlace del Botón "Saber más"',
      type: 'string',
      description: 'Ingresa la ruta interna (ej. /blog/mi-post) o URL externa para redirigir.',
    }),
  ],
})
