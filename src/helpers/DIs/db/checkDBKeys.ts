import type { DBKey } from './indexedDB'

const cacheKeys = Object.keys(import.meta.glob('../../../pages/**/index.vue', { eager: true }))
  .filter(key => key)
  .map((path) => {
    const dirs = path
      .split('../pages')[1]
      ?.split('/') ?? []
    dirs.pop()

    return formatStrList(dirs)
  })

/**
 * Verify that the key used is valid
 */
export function checkDBKeys(key: DBKey | DBKey[]) {
  const keys = ([] as DBKey[]).concat(key)

  const isValidKey = cacheKeys.some(k => keys.includes(k))

  if (!isValidKey) {
    window.console.warn(`Access data with invalid key: ${keys}`)
  }

  return isValidKey
}

/**
 * format string array
 */
function formatStrList(list: string[], sperators = ['_']): string {
  return list
    .map((item) => {
      const sep = sperators.find(sep => item.includes(sep))

      if (sep) {
        return formatStrList(item.split(sep))
      }

      return item.charAt(0).toUpperCase() + item.slice(1)
    })
    .join('')
}
