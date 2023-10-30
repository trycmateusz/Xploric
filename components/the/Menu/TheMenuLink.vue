<template>
  <li class="relative bg-black-lighter border-[0.7rem] border-black-lighter rounded-3xl overflow-hidden">
    <nuxt-link
      class="relative flex flex-col justify-end  h-[30svh] max-h-[600px] p-4 z-10 sm:min-h-[40svh] md:h-[50svh]"
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
      <img
        class="absolute top-1/2 left-1/2 min-h-[90%] min-w-[120%] -translate-y-1/2 -translate-x-1/2"
        :src="getAbsolutePath(`~/assets/img/${link.text}.svg`)"
        alt=""
      >
    </ClientOnly>
  </li>
</template>

<script setup lang="ts">
import type { MainMenuLink } from '~/types/MainMenu'
defineProps<{
  link: MainMenuLink
}>()
const { getAbsolutePath } = useImages()
</script>

<style scoped>

</style>
