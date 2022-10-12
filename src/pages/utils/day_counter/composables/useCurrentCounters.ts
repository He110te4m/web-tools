import type { Ref } from 'vue'
import type { Counter } from '../types'

const storeKey = 'UtilsDayCounter'

export function useCurrentCounters() {
  const { get, set } = useDB()

  const counters: Ref<Counter[]> = ref([])

  get<Counter[]>(storeKey).then((list) => {
    if (isValidCounters(list)) {
      counters.value = list ?? counters.value
    }
  })

  watch(counters, (val) => {
    set(storeKey, toRaw(val))
  }, { deep: true })

  function add(counter: Counter) {
    counters.value.push(counter)
  }

  return { counters, add }
}

function isValidCounters(data: unknown): data is Counter[] {
  return Array.isArray(data) && data.every(item => !Array.isArray(item))
}
