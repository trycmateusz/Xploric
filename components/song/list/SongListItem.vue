<template>
  <li class="flex flex-col gap-4 p-4 bg-black-lighter rounded-xl xs:flex-row">
    <img
      v-if="coverLoaded"
      :src="song.album.images[0].url"
      :alt="`${song.name}'s cover`"
      class="rounded-lg xs:w-[7rem]"
    >
    <div class="xs:flex xs:flex-col xs:justify-between xs:mr-4">
      <span class="block text-lg leading-none">
        {{ song.name }}
      </span>
      <span class="block text-gray-main">
        {{ song.artists[0].name }}
      </span>
    </div>
    <div class="flex gap-4 justify-between xs:flex-col xs:ml-auto">
      <div class="relative">
        <button
          :id="optionsTogglerId"
          :aria-expanded="optionsOpen"
          :aria-controls="optionsId"
          class="w-[2rem] main-transition"
          @click="optionsOpen = !optionsOpen"
        >
          <img
            class="pointer-events-none"
            src="~/assets/img/more-options.svg"
            :alt="`Show more options for song '${song.name}'`"
          >
        </button>
        <AppOptions
          v-if="optionsOpen"
          :id="optionsId"
          :options="userStore.auth?.id === playlistUserId ? [...userOptions, ...defaultOptions] : defaultOptions"
          :toggler-id="optionsTogglerId"
          class="top-1/2 left-1/2 xs:left-auto xs:right-1/2"
          @close="optionsOpen = false"
        />
      </div>

      <nuxt-link
        class="w-[2rem] main-transition"
        :to="`/player/${song.id}`"
      >
        <img
          src="~/assets/img/play-circle.svg"
          :alt="`Play song ${song.name}`"
        >
      </nuxt-link>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
import type { AppOptionLink, AppOptionButton } from '~/types/App'
const props = defineProps<{
  song: SpotifyApiSong
  playlistUserId?: string
}>()
const userStore = useUserStore()
const optionsTogglerId = `song-${props.song.id}-options-toggler`
const optionsId = `song-${props.song.id}-options`
const optionsOpen = ref(false)
const coverLoaded = ref(false)
// @ts-ignore
const defaultOptions: (AppOptionButton | AppOptionLink)[] = [
  {
    text: 'Copy link',
    id: Math.random().toString(),
    onClick: () => console.log('Copy link')
  }
]
const userOptions: (AppOptionButton | AppOptionLink)[] = [
  {
    text: 'Remove',
    id: Math.random().toString(),
    onClick: () => console.log('remove'),
    destructive: true
  },
  {
    text: 'Move',
    id: Math.random().toString(),
    onClick: () => console.log('move')
  }
]
onMounted(() => {
  coverLoaded.value = true
})
</script>

<style scoped>

</style>
