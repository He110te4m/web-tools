<script lang="ts" setup>
import type { ToolCardInfo } from './types'

const { info, shadowSize = 12 } = defineProps<{
  info: ToolCardInfo
  shadowSize: number | string
}>()
const shadowFullSize = useCSSLen(shadowSize)
</script>

<template>
  <router-link v-slot="{ navigate }" :to="info.key" custom>
    <div class="tool-card" flex="~ col" h="full" justify="around" @click="navigate">
      <div v-show="info.img">
        img: {{ info.img }}
      </div>
      <div>name: {{ info.name }}</div>
    </div>
  </router-link>
</template>

<style scoped>
.tool-card {
  box-shadow: 0 0 calc(v-bind(shadowFullSize) / 2) #E4E4E7;
  transition: .3s box-shadow;
}

.tool-card:hover {
  box-shadow: 0 0 v-bind(shadowFullSize) #A1A1AA;
}
</style>
