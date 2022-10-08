<script lang="ts" setup>
import { useCurrentCounters } from './composables/useCurrentCounters'

const { t } = useI18n()
const { counters } = useCurrentCounters()
function onAddCounter() {
  counters.value.push({
    title: 'test 1',
    targetTime: new Date().getTime(),
  })
}
</script>

<template>
  <h2 text="xl">
    {{ t('pages.utils.day_counter.title') }}
  </h2>

  <button @click="onAddCounter">
    {{ t('add.button') }}
  </button>

  <dl flex="~ col" gap="12px" my="12px" items="center">
    <dd v-for="counter in counters" :key="`${counter.title}-${counter.targetTime}`" w="80%" mw="800px" p="x-4 y-2" border="~ color-gray-300" flex="~">
      <div flex="auto">
        {{ counter.title }}
      </div>
    </dd>
  </dl>
</template>

<i18n lang="yml">
zh-CN:
  add:
    button: 新增倒数日
</i18n>
