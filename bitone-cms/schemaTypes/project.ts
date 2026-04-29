import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  fields: [
    defineField({
      name: 'client',
      title: 'Cliente / Empresa',
      type: 'reference',
      to: [{ type: 'client' }],
      description: 'Selecciona la empresa para la que se desarrolló este proyecto.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Nombre del Proyecto / Módulo',
      type: 'string',
      description: 'Ej: Sistema de Gestión de Inventarios, Fase 2: App Móvil, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Imagen Destacada (Preview)',
      type: 'image',
      description: 'Captura de pantalla o representación visual de este proyecto específico.'
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      description: 'Identificador único para la URL del proyecto (ej. mi-proyecto).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Giro del Negocio',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'workDescription',
      title: 'Descripción Corta (Cards del Home)',
      type: 'text',
      description: 'Breve resumen (máximo 2 líneas) para no romper el diseño de las tarjetas en el Inicio.'
    }),
    defineField({
      name: 'longDescription',
      title: 'Descripción Larga (Página de Proyectos)',
      type: 'text',
      description: 'Explicación detallada del problema, solución técnica empleada y resultados logrados.'
    }),
    defineField({
      name: 'content',
      title: 'Contenido Detallado',
      type: 'blockContent',
      description: 'Caso de éxito completo: Retos, Solución Técnica y Resultados con formato enriquecido.'
    }),
    defineField({ name: 'date', title: 'Fecha del Proyecto', type: 'date' }),
    defineField({
      name: 'featured',
      title: 'Mostrar en Inicio',
      type: 'boolean',
      initialValue: true,
      description: 'Activa esto para que aparezca en el banner o en la galería principal.'
    }),
  ],
})