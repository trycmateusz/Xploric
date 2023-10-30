<template>
  <div class="wrapper p-4 bg-black-main min-h-[100vh] text-white-main">
    <ul class="flex flex-col gap-4">
      <MainMenuLink
        v-for="link in mainMenuLinks"
        :key="link.text"
        :link="link"
      >
        <template #client-assets>
          <img
            class="absolute top-1/2 left-1/2 min-h-[90%] min-w-[120%] -translate-y-1/2 -translate-x-1/2"
            :src="getAbsolutePath(`~/assets/img/${link.text}.svg`)"
            alt=""
          >
        </template>
      </MainMenuLink>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { MainMenuLink } from '~/types/MainMenu'
const { getAbsolutePath } = useImages()
const mainMenuLinks: MainMenuLink[] = [
  {
    to: '/',
    text: 'Discover',
    highlight: 'new music',
    colorClass: 'text-light-blue-main'
  },
  {
    to: '/',
    text: 'Explore',
    highlight: 'all genres',
    colorClass: 'text-light-green-main'
  },
  {
    to: '/',
    text: 'Review',
    highlight: 'one\'s taste',
    colorClass: 'text-tomato-main'
  }
]
</script>

<style scoped>
</style>
