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
      name: 'summaryHome',
      title: 'Resumen para Home',
      type: 'string',
      description: 'Texto muy breve (1 frase) que aparece en la tarjeta pequeña del Inicio.',
    }),
    defineField({
      name: 'summaryList',
      title: 'Resumen para Listado de Servicios',
      type: 'text',
      rows: 3,
      description: 'Descripción un poco más extensa para la tarjeta en la página de /servicios.',
    }),
    defineField({
      name: 'content',
      title: 'Contenido Detallado (Página de Servicio)',
      type: 'blockContent',
      description: 'Cuerpo completo del servicio con texto enriquecido, imágenes y formato editorial.',
    }),
  ],
})
