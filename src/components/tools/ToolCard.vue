<script lang="ts" setup>
const { info } = defineProps<{
  info: Record<'key' | 'name' | 'img', string>
}>()

const { t } = useI18n()
</script>

<template>
  <router-link v-slot="{ navigate }" :to="info.key" custom>
    <div class="tool-card" flex="~ col" h="full" justify="around" @click="navigate">
      <img v-show="info.img" :src="info.img" :alt="info.name">
      <div>{{ t('tool-name') }} {{ info.name }}</div>
    </div>
  </router-link>
</template>

<style scoped>
.tool-card {
  box-shadow: 0 0 12px #E4E4E7;
  transition: .3s box-shadow;
}

.tool-card:hover {
  box-shadow: 0 5px 12px #A1A1AA;
}
</style>

<i18n lang="yml">
zh-CN:
  tool-name: 工具名：
</i18n>
