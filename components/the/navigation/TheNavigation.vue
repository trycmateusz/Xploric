<template>
  <nav class="sticky w-full top-0 border-b bg-black-main border-black-lighter z-50">
    <div class="relative wrapper">
      <div class="flex justify-between gap-4 relative bg-black-main z-50">
        <div class="flex">
          <nuxt-link class="text-white-main p-4 pr-2 main-transition" to="/">
            Xploric
          </nuxt-link>
          <button
            aria-label="Toggle main navigation links"
            :aria-controls="burgerAriaControls"
            :aria-expanded="linksExpanded"
            class="burger flex flex-col justify-center gap-1 pr-0 p-4 main-transition xs:pr-4"
            @click="linksExpanded = !linksExpanded"
          >
            <div class="burger-bar" />
            <div class="burger-bar" />
            <div class="burger-bar" />
          </button>
        </div>

        <ClientOnly>
          <button
            class="flex items-center justify-center gap-2 pr-4 py-2 text-white-main main-transition xs:pl-4"
            :aria-controls="userAriaControls"
            :aria-expanded="userLinksExpanded"
            @click="userLinksExpanded = !userLinksExpanded"
          >
            <img src="~/assets/img/user.svg" alt="">
            <span v-if="userStore.auth" class="relative flex-shrink whitespace-nowrap text-ellipsis overflow-hidden">
              {{ userStore.auth.username }}
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
        <TheNavigationLink
          v-if="userStore.auth"
          :link="{
            text: 'My Playlists',
            to: '/'
          }"
          :anchor-tabindex="linksExpanded ? '0' : '-1'"
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
const userStore = useUserStore()
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
  }
]

const userLinks = computed<Link[]>(() => {
  if (userStore.auth) {
    return [
      {
        to: '/my-profile',
        text: 'My Account'
      },
      {
        to: '/',
        text: 'Logout'
      }
    ]
  } else {
    return [
      {
        to: '/',
        text: 'Login'
      },
      {
        to: '/',
        text: 'Register'
      }
    ]
  }
})
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
