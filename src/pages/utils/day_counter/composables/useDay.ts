import type { MaybeRef } from '@vueuse/core'
import type { Counter } from '../types'

const dayMS = 24 * 60 * 60 * 1000

export function useDay(counters: MaybeRef<Counter[]>) {
  return computed(() => unref(counters).map(counter => ({
    title: counter.title,
    day: formatCounterTime(counter),
  })))
}

function formatCounterTime({ targetTime/* , startTime */ }: Counter) {
  const { t } = useI18n()
  const dayNum = getDayByMS(targetTime - Date.now())

  return t('unit.day', { num: dayNum })
}

function getDayByMS(ms: number) {
  return Math.ceil(Math.abs(ms) / dayMS)
}
