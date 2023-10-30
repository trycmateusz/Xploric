<template>
  <li class="relative bg-black-lighter border-[0.7rem] border-black-lighter rounded-[1.5rem] overflow-hidden">
    <nuxt-link
      class="relative flex flex-col justify-end  min-h-[30svh] p-4 z-10 sm:min-h-[40svh] md:min-h-[50svh]"
      :to="link.to"
    >
      <span class="text-5xl">
        {{ link.text }}
      </span>
      <span class="text-3xl leading-none" :class="[link.colorClass]">
        {{ link.highlight }}
      </span>
    </nuxt-link>
    <ClientOnly>
      <slot name="client-assets" />
    </ClientOnly>
  </li>
</template>

<script setup lang="ts">
import type { MainMenuLink } from '~/types/MainMenu'
defineProps<{
  link: MainMenuLink
}>()
</script>

<style scoped>

</style>
