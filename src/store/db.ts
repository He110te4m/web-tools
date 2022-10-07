import { acceptHMRUpdate, defineStore } from 'pinia'
import { type DBKey, IndexedDB } from '~/helpers/gen/operators/indexedDB'

const cacheKeys = Object.keys(import.meta.glob('../pages/**/index.vue', { eager: true }))
  .filter(key => key)
  .map((path) => {
    const dirs = path
      .split('../pages')[1]
      ?.split('/') ?? []
    dirs.pop()

    return formatStrList(dirs)
  })

export const useDBStore = defineStore('db', () => {
  const db = new IndexedDB({
    dbName: 'WebTools',
    storeName: 'LocalData',
  })

  const get = createFn(async <T>(key: DBKey) => db.get<T>(key))
  const set = createFn<Promise<void>, [any]>(async (key: DBKey, value: any): Promise<void> => {
    await db.set(key, value)
  })

  return {
    get,
    set,
  }
})

type CreateFn<TReturn, TParams extends any[]> =
  (key: DBKey, ...args: TParams) =>
  (TReturn extends Promise<infer TOrigin> ? Promise<TOrigin | undefined> : TReturn | undefined)

function createFn<TReturn, TParams extends any[]>(fn: CreateFn<TReturn, TParams>) {
  return ((key, ...args) => {
    return checkKeys(key) ? fn(key, ...args) : undefined
  }) as CreateFn<TReturn, TParams>
}

/**
 * Verify that the key used is valid
 */
function checkKeys(key: DBKey) {
  const keys = ([] as DBKey[]).concat(key)

  const isValidKey = cacheKeys.some(k => keys.includes(k))

  if (!isValidKey) {
    window.console.warn(`Access data with invalid key: ${isValidKey}`)
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDBStore, import.meta.hot))
}
