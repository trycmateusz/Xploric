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
      <div class="text-xl ">
        <span>
          {{ listenedDurationText }}
        </span>
        /
        <span>
          {{ fullDurationText }}
        </span>
      </div>

      <audio :src="song.preview_url">
        <a :href="song.preview_url">
          Download {{ song.name }}
        </a>
      </audio>
      <progress
        id="songPlayed"
        class="w-full h-6 rounded-full overflow-hidden appearance-none"
        max="100"
        value="70"
      />
      <div class="flex justify-center gap-4">
        <button @click="playPreviousSongOrRewindToBeginning">
          <img src="~/assets/img/previous-song.svg" alt="Play pervious song on the playlist or rewind to the beginning">
        </button>
        <button @click="goBackFiveSeconds">
          <img src="~/assets/img/back-5-seconds.svg" alt="Rewind 5 seconds">
        </button>
        <button class="flex justify-center items-center w-8" @click="songPlaying = !songPlaying">
          <img
            :src="songPlaying ? getAbsolutePath('~/assets/img/pause.svg') : getAbsolutePath('~/assets/img/play.svg')"
            :alt="songPlaying ? 'Pause song' : 'Play song'"
          >
        </button>
        <button @click="goForwardFiveSeconds">
          <img src="~/assets/img/forward-5-seconds.svg" alt="Go forward 5 seconds">
        </button>
        <button @click="playNextSong">
          <img src="~/assets/img/next-song.svg" alt="Play next song on the playlist">
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
import { getDurationMinutesAndSecondsInProperFormat } from '~/helpers'
const { getAbsolutePath } = useImages()
const props = defineProps<{
  song: SpotifyApiSong
  fromPlaylist: boolean
}>()
const listenedDuration = ref(0)
const songPlaying = ref(true)
const listenedDurationText = computed(() => {
  return getDurationMinutesAndSecondsInProperFormat(listenedDuration.value)
})
const fullDurationText = computed(() => {
  return getDurationMinutesAndSecondsInProperFormat(props.song.duration_ms)
})
const goForwardFiveSeconds = () => {
  if (listenedDuration.value + 5000 > props.song.duration_ms) {
    listenedDuration.value = props.song.duration_ms
  } else {
    listenedDuration.value += 5000
  }
}
const goBackFiveSeconds = () => {
  if (listenedDuration.value - 5000 < 0) {
    listenedDuration.value = 0
  } else {
    listenedDuration.value -= 5000
  }
}
const playPreviousSongOrRewindToBeginning = () => {
  if (!props.fromPlaylist || (props.fromPlaylist && listenedDuration.value < 5000)) {
    listenedDuration.value = 0
  } else {
    console.log('play previous')
  }
}
const playNextSong = () => {
  console.log('play next')
}
</script>

<style scoped>
::-webkit-progress-bar {
  background-color: var(--black-lighter);
}
::-webkit-progress-value {
  background-color: var(--white-main);
  border-radius: 100vw;
}
</style>
