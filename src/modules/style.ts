import type { UserModule } from '~/types'

// import global style
export const install: UserModule = async () => {
  await Promise.all([
    import('@unocss/reset/tailwind.css'),
    import('../styles/main.css'),
  ])
  await import('uno.css')
}
