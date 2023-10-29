<template>
  <li
    class="flex border-b border-black-lighter text-center transition-opacity last:border-b-0 hover:opacity-70"
  >
    <nuxt-link
      :to="link.to"
      class="w-full p-4 text-white-main"
    >
      {{ link.text }}
    </nuxt-link>
  </li>
</template>

<script setup lang="ts">
import type { NavigationLink } from '~/types/Navigation'
defineProps<{
  link: NavigationLink
}>()
</script>

<style scoped>

</style>
