<template>
  <li class="flex flex-col gap-4 p-4 bg-black-lighter rounded-xl xs:flex-row xs:max-w-full">
    <img
      v-if="coverLoaded"
      :src="song.album.images[0].url"
      :alt="`${song.name}'s cover`"
      class="rounded-lg xs:w-[7rem]"
    >
    <div class="relative xs:flex xs:flex-col xs:justify-between xs:w-[Calc(50%_-_1rem)]">
      <div class="absolute w-2 h-full pointer-events-none right-0 top-0 bg-gradient-to-r from-transparent to-black-lighter" />
      <span class="block text-lg leading-none overflow-hidden">
        {{ song.name }}
      </span>
      <nuxt-link 
        :to="song.artists[0].uri" 
        class="block text-gray-main overflow-hidden main-transition"
      >
        {{ song.artists[0].name }}
      </nuxt-link>
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
        :to="{ path: `/player/${song.id}`, query: { fromPlaylist: playlistId } }"
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
import { copyLink } from '~/helpers/clipboard'
import type { SpotifyApiSong } from '~/types/Spotify'
import type { AppOptionLink, AppOptionButton } from '~/types/App'
const props = defineProps<{
  song: SpotifyApiSong
  playlistUserId?: string
  playlistId?: string
}>()
const emit = defineEmits<{
  (e: 'remove'): void
  (e: 'move'): void
}>()
const userStore = useUserStore()
const optionsTogglerId = `song-${props.song.id}-options-toggler`
const optionsId = `song-${props.song.id}-options`
const optionsOpen = ref(false)
const coverLoaded = ref(false)
const defaultOptions: (AppOptionButton | AppOptionLink)[] = [
  {
    text: 'Copy link',
    id: Math.random().toString(),
    onClick: () => copyLink()
  }
]
const userOptions: (AppOptionButton | AppOptionLink)[] = [
  {
    text: 'Remove',
    id: Math.random().toString(),
    onClick: () => emit('remove'),
    destructive: true
  },
  {
    text: 'Move',
    id: Math.random().toString(),
    onClick: () => emit('move')
  }
]
onMounted(() => {
  coverLoaded.value = true
})
</script>

<style scoped>

</style>
