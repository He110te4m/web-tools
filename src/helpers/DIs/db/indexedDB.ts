import { type UseStore, createStore, get, getMany, set, setMany, update } from 'idb-keyval'

export type DBKey = Exclude<IDBValidKey, any[]> & keyof any

interface Config {
  dbName: string
  storeName: string
  checkDBKeys?: (key: DBKey | DBKey[]) => boolean
}

const FnMap = {
  get,
  getMany,
  set,
  setMany,
  update,
} as const

type FnMapType = typeof FnMap
type FnKey = keyof FnMapType

// In order to deduce the correct parameter type, the uniform parameter must be required to be filled in
type GetFnParams<Fn extends FnKey> = RemoveLast<Required<Parameters<FnMapType[Fn]>>>

export class IndexedDB {
  #db: UseStore
  #checkDBKeys: Required<Config>['checkDBKeys']

  constructor({ dbName, storeName, checkDBKeys = () => true }: Config) {
    this.#db = createStore(dbName, storeName)
    this.#checkDBKeys = checkDBKeys
  }

  get = this.bindFn('get')
  getMany = this.bindFn('getMany')

  set = this.bindFn('set')
  setMany = this.bindFn('setMany')

  update = this.bindFn('update')

  private bindFn<Fn extends FnKey>(fnName: Fn) {
    return <T>(...params: GetFnParams<Fn>) => {
      const keys = (<DBKey[]>[]).concat(params[0] as DBKey | DBKey[])
      if (keys.every(this.#checkDBKeys)) {
        return FnMap[fnName]<T>(...params as [any], this.#db)
      }

      return Promise.resolve()
    }
  }
}
