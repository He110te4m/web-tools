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
  <dl>
    <dd v-for="counter in counters" :key="`${counter.title}-${counter.targetTime}`">
      {{ counter.title }}
    </dd>
  </dl>

  <button @click="onAddCounter">
    {{ t('add.button') }}
  </button>
</template>

<i18n lang="yml">
zh-CN:
  add:
    button: 新增倒数日
</i18n>
