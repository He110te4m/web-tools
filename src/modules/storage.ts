import type { UserModule } from '~/types'

export const install: UserModule = async () => {
  if (navigator.storage?.persist) {
    await navigator.storage.persist()
  }
}
