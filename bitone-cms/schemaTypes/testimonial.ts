import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonios',
  type: 'document',
  fields: [
    defineField({ name: 'authorName', title: 'Nombre de la Persona', type: 'string' }),
    defineField({ name: 'authorRole', title: 'Cargo en la Empresa (Ej. CEO, Gerente)', type: 'string' }),
    defineField({ 
      name: 'project', 
      title: 'Empresa / Proyecto Relacionado', 
      type: 'reference', 
      to: [{ type: 'project' }],
      description: 'Selecciona la empresa de la lista de proyectos para importar su logo.'
    }),
    defineField({ name: 'quote', title: 'Comentario / Testimonio', type: 'text' }),
    defineField({ 
      name: 'approved', 
      title: 'Aprobado para mostrarse', 
      type: 'boolean', 
      initialValue: false 
    }),
  ],
})