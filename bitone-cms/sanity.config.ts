import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'BitOne Studio',

  projectId: 'fjtg86e5',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Panel de Control BitOne')
          .items([
            ...S.documentTypeListItems(),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})