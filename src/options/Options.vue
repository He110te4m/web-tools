<script setup lang="ts">
import { apiKey } from '~/logic/storage'
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <input v-model="apiKey" class="border border-gray-400 rounded px-2 py-1 mt-2">
  </main>
</template>
