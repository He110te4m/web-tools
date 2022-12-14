import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import type { UserModule } from './types'
import generatedRoutes from '~pages'

main()

async function main() {
  const app = createApp(App)

  const router = getRouter()

  // Auto-load module
  const modules = import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true })
  await Promise.all(
    Object.values(modules).map(mod => mod.install({ app, router })),
  )

  app.use(router)

  app.mount('#app')
}

function getRouter() {
  const routes = setupLayouts(generatedRoutes)
  const router = createRouter({
    routes,
    history: createWebHashHistory(),
  })

  return router
}
