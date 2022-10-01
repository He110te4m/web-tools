import type { MaybeRef } from '@vueuse/shared'

const colNum = 3
export function useToolsLayout(count: MaybeRef<number>) {
  return [
    computed(() => colNum),
    computed(() => Math.ceil(unref(count) / colNum)),
  ]
}

export function useCSSLen(len: MaybeRef<number | string>) {
  return computed(() => {
    const currenLen = unref(len)
    return typeof currenLen === 'string' ? currenLen : `${currenLen}px`
  })
}
