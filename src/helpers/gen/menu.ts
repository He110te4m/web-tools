import type { RouteRecordRaw } from 'vue-router'
import type { ToolCardInfo } from '~/components/tools/types'

export function genMenu(routes: RouteRecordRaw[], allowList: (string | RegExp)[]) {
  return routes
    .filter(({ path }) => allowList.some(rule => typeof rule === 'string' ? path.includes(rule) : rule.test(path)))
    .map(({ path, meta = {} }): ToolCardInfo => ({
      key: path,
      name: genMenuNameByPath(path),
      img: <string>meta.img ?? '',
    }))
}

function genMenuNameByPath(path: string): string {
  const { t } = useI18n()

  const i18nKey = path
    .slice(1)
    .split('/')
    .join('.')

  return t(`pages.${i18nKey}.title`)
}
