<template>
  <nav class="border-b bg-black-main border-black-lighter">
    <div class="relative wrapper">
      <div class="flex justify-between relative bg-black-main z-50">
        <button
          aria-label="Toggle main navigation links"
          :aria-controls="burgerAriaControls"
          :aria-expanded="linksExpanded"
          class="burger flex flex-col gap-1 p-4"
          @click="linksExpanded = !linksExpanded"
        >
          <div class="burger-bar" />
          <div class="burger-bar" />
          <div class="burger-bar" />
        </button>
        <button
          class="flex justify-center items-center gap-2 px-4"
          :aria-controls="userAriaControls"
          :aria-expanded="userLinksExpanded"
          @click="userLinksExpanded = !userLinksExpanded"
        >
          <img src="~/assets/img/user.svg" alt="">
          <img src="~/assets/img/arrow-down.svg" alt="" class="h-1/4">
        </button>
      </div>
      <ul
        :id="burgerAriaControls"
        :aria-hidden="!linksExpanded"
        class="absolute bg-black-main border-t border-b border-r border-black-lighter -translate-y-full z-40 transition-transform md:border-l"
        :class="{ 'translate-y-0': linksExpanded }"
      >
        <TheNavigationLink
          v-for="link in links"
          :key="link.text"
          :link="link"
        />
      </ul>
      <ul
        :id="userAriaControls"
        :aria-hidden="!linksExpanded"
        class="absolute right-0 bg-black-main border-t border-b border-r border-black-lighter -translate-y-full z-40 transition-transform md:border-l"
        :class="{ 'translate-y-0': userLinksExpanded }"
      >
        <TheNavigationLink
          v-for="link in userLinks"
          :key="link.text"
          :link="link"
        />
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { NavigationLink } from '~/types/Navigation'
const linksExpanded = ref(false)
const userLinksExpanded = ref(false)
const links: NavigationLink[] = [
  {
    to: '/',
    text: 'Main Menu'
  },
  {
    to: '/',
    text: 'Explore genres'
  },
  {
    to: '/',
    text: 'Review someone\'s playlist'
  },
  {
    to: '/',
    text: 'My playlists'
  }
]
const userLinks: NavigationLink[] = [
  {
    to: '/',
    text: 'Login'
  },
  {
    to: '/',
    text: 'Register'
  },
  {
    to: '/',
    text: 'My Account'
  }
]
const burgerAriaControls = 'main-navigation-links'
const userAriaControls = 'main-navigation-user-links'
watch(userLinksExpanded, () => {
  if (userLinksExpanded.value) {
    linksExpanded.value = false
  }
})
watch(linksExpanded, () => {
  if (linksExpanded.value) {
    userLinksExpanded.value = false
  }
})
</script>

<style scoped>
.burger-bar {
  @apply w-8 h-[2px] bg-white-main
}
</style>
