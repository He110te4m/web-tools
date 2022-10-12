import { asClass, asValue, createContainer } from 'awilix'
import { IndexedDB } from './indexedDB'

export function useDB(): IndexedDB {
  const container = createContainer()

  container.register({
    dbName: asValue('WebTools'),
    storeName: asValue('LocalData'),
    checkDBKeys: asValue(checkDBKeys),
    db: asClass(IndexedDB).singleton(),
  })

  return container.cradle.db
}
