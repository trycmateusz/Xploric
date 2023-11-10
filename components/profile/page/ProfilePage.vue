<template>
  <div>
    <ProfilePageBackground :bg-url="user.profileBgUrl" />
    <div class="flex flex-col wrapper p-4 text-white">
      <div class="flex items-center gap-5 mb-8 text-3xl">
        <h1 class="text-light-blue-lighter w-fit">
          {{ welcomeHeading }}
        </h1>
        <ClientOnly>
          <nuxt-link
            v-if="ownProfile"
            class="h-[1.2em] hover:opacity-70 focus:opacity-70 transition-opacity"
            to="/my-profile/edit"
          >
            <img
              class="h-full aspect-square"
              src="~/assets/img/edit-blue.svg"
              alt="Edit your profile"
            >
          </nuxt-link>
        </ClientOnly>
      </div>
      <h2 class="text-xl mb-4">
        {{ playlistHeading }}
      </h2>
      <PlaylistList :playlists="usersPlaylists" />
      <nuxt-link
        v-if="ownProfile && usersPlaylists.length > 0"
        to="/"
        class="inline-block mx-auto mt-10 text-center text-light-blue-lighter text-xl"
      >
        create a new playlist
      </nuxt-link>
      <div class="flex flex-col gap-5 mt-10">
        <AppButton
          :text="favouriteSongsText"
          styling="primary"
          @click="() => console.log('your favourite songs')"
        />
        <div
          v-if="ownProfile"
          class="flex flex-col gap-5"
        >
          <AppButton
            text="Check last 10 songs you listened to"
            styling="secondary"
            @click="() => console.log('10 songs before')"
          />
          <AppLink
            to="/my-profile/edit"
            text="Edit your profile"
            styling="secondary"
            @click="() => console.log('edit profile')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types/User'
const playlistStore = usePlaylistStore()
const props = defineProps<{
  ownProfile: boolean
  user: User
}>()
const bgLoaded = ref(false)
const usersPlaylists = computed(() => {
  return playlistStore.getUsersPlaylists(props.user)
})
const welcomeHeading = computed(() => {
  if (props.ownProfile) {
    return `Hello, ${props.user?.username}`
  } else {
    return `${props.user.username}'s profile`
  }
})
const favouriteSongsText = computed(() => {
  if (props.ownProfile) {
    return 'Your favourite songs'
  } else {
    return `${props.user.username}'s favourite songs`
  }
})
const playlistHeading = computed(() => {
  if (props.ownProfile) {
    return 'Your playlists'
  } else {
    return 'Their playlists'
  }
})

onMounted(() => {
  bgLoaded.value = true
})
</script>

<style scoped>

</style>
