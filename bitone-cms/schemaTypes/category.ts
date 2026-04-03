import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categorías de Negocio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Giro',
      type: 'string',
      description: 'Ejemplo: Farmacia, Gimnasio, Restaurante'
    }),
    defineField({
      name: 'description',
      title: 'Descripción (Opcional)',
      type: 'text'
    }),
  ],
})