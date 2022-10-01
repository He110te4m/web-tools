import { createHead } from '@vueuse/head'
import type { UserModule } from '~/types'

// create vueuse head
export const install: UserModule = ({ app }) => {
  app.use(createHead())
}
