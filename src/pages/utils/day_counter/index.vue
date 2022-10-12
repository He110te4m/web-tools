<script lang="ts" setup>
import { useCurrentCounters } from './composables/useCurrentCounters'
import { useDay } from './composables/useDay'

const { t } = useI18n()
const { counters, add } = useCurrentCounters()
const currentData = useDay(counters)

function onAddCounter() {
  add({
    title: 'test 1',
    targetTime: new Date().getTime(),
  })
}
</script>

<template>
  <h2 text="xl">
    {{ t('pages.utils.day_counter.title') }}
  </h2>

  <button border="~ color-gray-300 rd-2px" p="x-4 y-2" @click="onAddCounter">
    {{ t('add.button') }}
  </button>

  <dl flex="~ col" gap="12px" my="12px" items="center">
    <dd v-for="counter in currentData" :key="`${counter.title}-${counter.day}`" w="80%" max-w="800px" max-h="72px" overflow="hidden" border="~ color-gray-300 rd-2" flex="~">
      <div flex="auto" text="left" p="x-4 y-2" lh="20px">
        {{ counter.title }}
      </div>
      <div p="x-4 y-2" lh="20px" w="160px" flex="~ none" items="center" text="center" bg="sky-300">
        {{ counter.day }}
      </div>
    </dd>
  </dl>
</template>

<i18n lang="yml">
zh-CN:
  add:
    button: 新增倒数日
</i18n>
