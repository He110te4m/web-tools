import { type UseStore, createStore, get, getMany, set, setMany, update } from 'idb-keyval'

interface Config {
  dbName: string
  storeName: string
}

export type DBKey = Exclude<IDBValidKey, any[]> & keyof any

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

  constructor({ dbName, storeName }: Config) {
    this.#db = createStore(dbName, storeName)
  }

  get = this.bindFn('get')
  getMany = this.bindFn('getMany')

  set = this.bindFn('set')
  setMany = this.bindFn('setMany')

  update = this.bindFn('update')

  private bindFn<Fn extends FnKey>(fnName: Fn) {
    return <T>(...params: GetFnParams<Fn>) => FnMap[fnName]<T>(...params as [any], this.#db)
  }
}
