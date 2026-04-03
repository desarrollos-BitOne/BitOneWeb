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
      name: 'summary',
      title: 'Resumen Corto',
      type: 'text',
      rows: 3,
      description: 'Aparece en la tarjeta simplificada.',
    }),
    defineField({
      name: 'description',
      title: 'Descripción Extensa',
      type: 'blockContent',
      description: 'Aparece en la página completa de servicios.',
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
