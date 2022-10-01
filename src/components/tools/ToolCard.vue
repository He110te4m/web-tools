<script lang="ts" setup>
const { info, shadowSize = 12 } = defineProps<{
  info: Record<'key' | 'name' | 'img', string>
  shadowSize: number | string
}>()
const shadowFullSize = useCSSLen(shadowSize)
</script>

<template>
  <div class="tool-card">
    <div>key: {{ info.key }}</div>
    <div>name: {{ info.name }}</div>
    <div>img: {{ info.img }}</div>
  </div>
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
