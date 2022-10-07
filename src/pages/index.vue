<script setup lang="ts">
import generatedRoutes from '~pages'

const menu = genMenu(generatedRoutes, [/^\/utils/])
const [colNum, rowNum] = useToolsLayout(menu.length)

const gap = computed(() => '12px')
</script>

<template>
  <div class="tools-container">
    <ToolCard v-for="item in menu" :key="item.key" :info="item" :shadow-size="gap" />
  </div>
</template>

<style scoped>
.tools-container {
  display: grid;
  grid-template: repeat(v-bind(rowNum), minmax(160px, 320px)) / repeat(v-bind(colNum), 1fr);
  gap: v-bind(gap);
}
</style>
