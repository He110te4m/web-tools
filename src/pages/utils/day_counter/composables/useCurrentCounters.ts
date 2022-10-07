import type { Ref } from 'vue'

interface Counter {
  title: string
  /** 倒计时对应的时间 */
  targetTime: number
  /** 是否只展示天： 为 true 展示 X 天；为 false 展示 X 年 X 月 X 日 */
  useDayUnit?: boolean
}

const storeKey = 'UtilsDayCounter'

export function useCurrentCounters() {
  const { get, set } = useDBStore()

  const counters: Ref<Counter[]> = ref([])

  get<Counter[]>(storeKey).then((list) => {
    if (isValidCounters(list)) {
      counters.value = list ?? counters.value
    }
  })

  watch(counters, (val) => {
    set(storeKey, toRaw(val))
  }, { deep: true })

  return { counters }
}

function isValidCounters(data: unknown): data is Counter[] {
  return Array.isArray(data) && data.every(item => !Array.isArray(item))
}
