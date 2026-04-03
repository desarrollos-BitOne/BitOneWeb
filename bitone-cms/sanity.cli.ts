import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'fjtg86e5',
    dataset: 'production'
  },
  // ...
  deployment: {
    autoUpdates: false,
  }
})
