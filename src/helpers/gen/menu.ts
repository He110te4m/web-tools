import type { RouteRecordRaw } from 'vue-router'

export function genMenu(routes: RouteRecordRaw[]) {
  return routes
    .filter(({ path }) => path.startsWith('/modules'))
    .map(({ path, meta = {} }) => ({
      key: path,
      name: path,
      img: <string>meta.img ?? '',
    }))
}
