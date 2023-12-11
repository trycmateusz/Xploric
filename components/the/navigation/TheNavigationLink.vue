<template>
  <li
    class="flex border-b border-black-lighter text-center"
  >
    <nuxt-link
      :to="link.to"
      :tabindex="anchorTabindex"
      class="w-full p-4 text-white-main transition-opacity focus:opacity-70 hover:opacity-70"
      @click="emit('close')"
    >
      {{ link.text }}
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
import type { Link } from '~/types/Link'
defineProps<{
  link: Link
  anchorTabindex: string
}>()
const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<style scoped>

</style>
~/stores/types/Link