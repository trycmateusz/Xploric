<template>
  <div>
    <main>
      <MusicPlayer
        v-if="song"
        :song="song"
        :from-playlist="false"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import type { SpotifyApiSong } from '~/types/Spotify'
const songStore = useSongStore()
const song = computed<SpotifyApiSong | undefined>(() => {
  return songStore.songs[songStore.songs.length - 1]
})
onMounted(() => {
  songStore.pauseOrPlayCurrent()
})
</script>

<style scoped>

</style>
