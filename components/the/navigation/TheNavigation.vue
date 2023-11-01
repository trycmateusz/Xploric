<template>
  <nav class="sticky w-full top-0 border-b bg-black-main border-black-lighter z-50">
    <div class="relative wrapper">
      <div class="flex justify-between gap-4 relative bg-black-main z-50">
        <div class="flex">
          <nuxt-link class="text-white-main p-4 pr-2" to="/">
            Xploric
          </nuxt-link>
          <button
            aria-label="Toggle main navigation links"
            :aria-controls="burgerAriaControls"
            :aria-expanded="linksExpanded"
            class="burger flex flex-col justify-center gap-1 p-4"
            @click="linksExpanded = !linksExpanded"
          >
            <div class="burger-bar" />
            <div class="burger-bar" />
            <div class="burger-bar" />
          </button>
        </div>

        <ClientOnly>
          <button
            class="flex justify-center items-center gap-2 px-4 py-2 text-white-main"
            :aria-controls="userAriaControls"
            :aria-expanded="userLinksExpanded"
            @click="userLinksExpanded = !userLinksExpanded"
          >
            <img src="~/assets/img/user.svg" alt="">
            <span class="relative w-fit  overflow-hidden">
              Username
              <div class="absolute right-0 top-0 h-full w-1/6 bg-gradient-to-r from-transparent to-black-main xs:hidden" />
            </span>
            <img
              src="~/assets/img/arrow-down.svg"
              alt=""
              class="h-1/3 transition-transform"
              :class="{ 'rotate-180': userLinksExpanded }"
            >
          </button>
        </ClientOnly>
      </div>
      <ul
        :id="burgerAriaControls"
        :aria-hidden="!linksExpanded"
        class="link-list border-r md:border-l"
        :class="{ '-translate-y-full': !linksExpanded }"
      >
        <TheNavigationLink
          v-for="link in links"
          :key="link.text"
          :anchor-tabindex="linksExpanded ? '0' : '-1'"
          :link="link"
        />
      </ul>
      <ClientOnly>
        <ul
          :id="userAriaControls"
          :aria-hidden="!userLinksExpanded"
          class="link-list right-0 border-l md:border-r"
          :class="{ '-translate-y-full': !userLinksExpanded }"
        >
          <TheNavigationLink
            v-for="link in userLinks"
            :key="link.text"
            :link="link"
            :anchor-tabindex="userLinksExpanded ? '0' : '-1'"
          />
        </ul>
      </ClientOnly>
    </div>
  </nav>
</template>

<script setup lang="ts">
import type { Link } from '~/types/Link'
const router = useRouter()
const linksExpanded = ref(false)
const userLinksExpanded = ref(false)
const links: Link[] = [
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
const userLinks: Link[] = [
  {
    to: '/',
    text: 'Login'
  },
  {
    to: '/',
    text: 'Register'
  },
  {
    to: '/my-profile',
    text: 'My Account'
  },
  {
    to: '/',
    text: 'Logout'
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
router.beforeEach(() => {
  userLinksExpanded.value = false
  linksExpanded.value = false
})
</script>

<style scoped>
.burger-bar {
  @apply w-7 h-[2px] bg-white-main
}
.link-list {
  @apply absolute bg-black-main border-t border-black-lighter z-40 transition-transform duration-300
}
</style>
