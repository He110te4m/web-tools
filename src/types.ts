import type { App } from 'vue'
import type { Router } from 'vue-router'

export interface UserContext {
  app: App<Element>
  router: Router
}

export type UserModule = (ctx: UserContext) => void | Promise<void>
