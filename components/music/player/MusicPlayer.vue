<template>
  <div
    v-if="song"
    class="wrapper p-4 text-white-main overflow-hidden min-h-[Calc(100svh_-_var(--nav-height))]"
  >
    <div class="flex flex-col items-center text-xl text-center ">
      <span class="text-2xl">
        {{ song.name }}
      </span>
      <span class="flex gap-2 items-center">
        <img src="~/assets/img/album-light.svg" class="h-[1em]" alt="">
        <span>
          {{ song.album.name }}
        </span>
      </span>
      <span class="flex gap-2 items-center text-gray-main">
        <img src="~/assets/img/artist.svg" alt="">
        <span>
          {{ song.artists[0].name }}
        </span>
      </span>
    </div>
    <div class="relative ml-auto mr-auto mt-8 max-w-[400px]">
      <img
        class="w-full relative z-10"
        :src="song.album.covers[0].url"
        :alt="`Cover from album ${song.album.name}`"
      >
      <img class="absolute top-1/2 left-1/2 max-w-none h-[130%] opacity-20 aspect-square blur-[50px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" :src="song.album.covers[0].url" alt="">
    </div>
    <div v-if="song.preview_url" class="mt-8">
      <audio ref="audio" controls :src="song.preview_url">
        <a :href="song.preview_url">
          Download {{ song.name }}
        </a>
      </audio>
      <MusicPlayerDuration />
      <progress
        id="songPlayed"
        class="w-full h-6 rounded-full overflow-hidden appearance-none"
        :max="maxProgressValue"
        :value="songProgress"
      />
      <MusicPlayerControls :from-playlist="fromPlaylist" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
const songStore = useSongStore()
const props = defineProps<{
  song: SpotifyApiSong
  fromPlaylist: boolean
}>()
const audio = ref<HTMLAudioElement | undefined>(undefined)
const maxProgressValue = 200
const songProgress = computed(() => {
  return Math.floor(songStore.currentListenedDuration / props.song.duration_ms * maxProgressValue)
})
</script>

<style scoped>
::-webkit-progress-bar {
  background-color: var(--black-lighter);
}
::-webkit-progress-value {
  background-color: var(--white-main);
  border-radius: 100vw;
}
audio {
  display: none;
}
</style>
