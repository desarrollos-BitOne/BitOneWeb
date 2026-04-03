import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Clientes y Proyectos',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre de la Empresa', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo del Cliente', type: 'image' }),
    // NUEVO CAMPO: IMAGEN DEL SOFTWARE
    defineField({ 
      name: 'image', 
      title: 'Imagen Destacada (Preview)', 
      type: 'image', 
      description: 'Captura de pantalla del software funcionando.' 
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