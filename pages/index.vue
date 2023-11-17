<template>
  <main class="wrapper p-4 pt-8 min-h-[100vh] text-white-main">
    <h1 class="text-5xl mb-8 text-white-main">
      Explore and save new music tracks with Xploric.
    </h1>
    <ul class="flex flex-col gap-4">
      <TheMenuLink
        v-for="link in mainMenuLinks"
        :key="link.text"
        :link="link"
      />
    </ul>
  </main>
</template>

<script setup lang="ts">
import type { MainMenuLink } from '~/types/MainMenu'
const userStore = useUserStore()
const mainMenuLinks: MainMenuLink[] = [
  {
    to: '/xplore',
    text: 'Discover',
    highlight: 'new music',
    colorClass: 'text-light-blue-main'
  },
  {
    to: '/xplore',
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
userStore.fetchUser('user1')
userStore.setAuth(userStore.users[0])
</script>

<style scoped>
</style>
