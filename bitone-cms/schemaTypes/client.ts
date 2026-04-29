import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'client',
  title: 'Directorio de Clientes',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre de la Empresa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Cliente',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Giro / Sector',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'website',
      title: 'Sitio Web (Opcional)',
      type: 'url'
    }),
    defineField({ 
      name: 'featured', 
      title: 'Mostrar en Inicio (Logotipo)', 
      type: 'boolean',
      initialValue: true,
      description: 'Activa esto para que el logotipo de la empresa aparezca en el carrusel de marcas del Inicio.'
    }),
  ],
})
